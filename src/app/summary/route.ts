import { NextRequest, NextResponse } from "next/server";
import { common } from "@faremeter/middleware";
import {
  x402Exact,
  isKnownCluster,
  isKnownSPLToken,
  type KnownCluster,
  type KnownSPLToken,
} from "@faremeter/info/solana";

const PAYTO_ADDRESS = process.env.PAYTO_ADDRESS!;
const FACILITATOR_URL =
  process.env.FAREMETER_FACILITATOR_URL || "https://facilitator.corbits.dev";
const NETWORK = process.env.FAREMETER_NETWORK || "devnet";
const ASSET = process.env.ASSET || "USDC";
const AMOUNT = process.env.PAYMENT_AMOUNT || "1000";
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

if (!isKnownCluster(NETWORK)) {
  throw new Error(
    `Invalid FAREMETER_NETWORK: ${NETWORK}. Must be devnet, testnet, or mainnet-beta`
  );
}

if (!isKnownSPLToken(ASSET)) {
  throw new Error(`Invalid ASSET: ${ASSET}. Must be USDC`);
}

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is required");
}

const network = NETWORK as KnownCluster;
const asset = ASSET as KnownSPLToken;

const { getPaymentRequiredResponse } =
  common.createPaymentRequiredResponseCache();

async function fetchSolanaTransaction(txHash: string): Promise<any> {
  try {
    const response = await fetch("https://api.devnet.solana.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTransaction",
        params: [
          txHash,
          {
            encoding: "jsonParsed",
            commitment: "finalized",
            maxSupportedTransactionVersion: 0,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Solana RPC error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Solana RPC error: ${data.error.message}`);
    }

    if (!data.result) {
      throw new Error("Transaction not found");
    }

    return data.result;
  } catch (error) {
    console.error("Error fetching Solana transaction:", error);
    throw error;
  }
}

async function callGroqLLM(transactionData: any): Promise<string> {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "user",
              content: `Analyze this Solana transaction and return a JSON summary with these exact fields:

Transaction Data:
${JSON.stringify(transactionData, null, 2)}

Return a JSON object with:
- transactionType: string (transfer/swap/mint/etc)
- status: string (success/failed)
- blockTime: string (readable timestamp)
- fee: string (fee in SOL)
- signers: array of signer addresses
- mainActions: array of main actions
- summary: brief description

Respond with only valid JSON, no markdown or code blocks.
`,
            },
          ],
          temperature: 1,
          max_completion_tokens: 8192,
          top_p: 1,
          stream: false,
          reasoning_effort: "medium",
          stop: null,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No response from LLM";
  } catch (error) {
    console.error("Error calling Groq LLM:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  const url = new URL(req.url);
  const resource = url.toString();

  let paymentResponse: { status: number; body: any } | undefined;

  const paymentRequirements = x402Exact({
    network,
    asset,
    amount: AMOUNT,
    payTo: PAYTO_ADDRESS,
  });

  const accepts = paymentRequirements.map((req) => ({
    ...req,
    resource,
    description: "Access to protected API endpoint",
    mimeType: "application/json",
  }));

  const middlewareResponse = await common.handleMiddlewareRequest({
    facilitatorURL: FACILITATOR_URL,
    accepts,
    resource,
    getPaymentRequiredResponse,
    getHeader: (key: string) => headers[key.toLowerCase()] || headers[key],
    sendJSONResponse: (status: number, body: any) => {
      paymentResponse = { status, body };
      return body;
    },
  });

  if (middlewareResponse || paymentResponse) {
    return NextResponse.json(paymentResponse!.body, {
      status: paymentResponse!.status,
    });
  }

  // Parse the request body to get the input
  const body = await req.json();
  const userInput = body.input || "";

  if (!userInput.trim()) {
    return NextResponse.json(
      {
        success: false,
        error: "Input cannot be empty",
      },
      { status: 400 }
    );
  }

  try {
    // Call the LLM with user input
    const transactionData = await fetchSolanaTransaction(userInput);
    const llmResponse = await callGroqLLM(transactionData);

    return NextResponse.json({
      success: true,
      message: "Response generated successfully!",
      timestamp: new Date().toISOString(),
      paid: true,
      input: userInput,
      llmResponse: llmResponse,
    });
  } catch (error: any) {
    console.error("Error processing LLM request:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate LLM response",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
