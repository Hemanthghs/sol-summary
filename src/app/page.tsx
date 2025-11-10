"use client";

import { useState } from "react";
import { createFareMeterClient } from "@/lib/faremeter-client";
import Link from "next/link";

interface TransactionAnalysis {
  transactionType?: string;
  status?: string;
  blockTime?: string;
  fee?: string;
  signers?: string[];
  mainActions?: string[];
  summary?: string;
  [key: string]: any;
}

export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [analysis, setAnalysis] = useState<TransactionAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const handleMint = async () => {
    setLoading(true);
    setError("");
    setResponse("");
    setAnalysis(null);

    try {
      const fetchWithPayment = await createFareMeterClient();

      const res = await fetchWithPayment("/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputValue }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      // Try to parse the llmResponse
      if (data.llmResponse) {
        try {
          // If llmResponse is a string, parse it
          const parsedAnalysis =
            typeof data.llmResponse === "string"
              ? JSON.parse(data.llmResponse)
              : data.llmResponse;
          setAnalysis(parsedAnalysis);
        } catch (parseError) {
          console.error("Failed to parse llmResponse:", parseError);
          // If parsing fails, show raw response
          setResponse(JSON.stringify(data, null, 2));
        }
      } else {
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      console.error("Full error:", err);
      setError(err.message || err.toString() || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "white",
              marginBottom: "10px",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Solana Transaction Summarizer
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "0",
            }}
          >
            AI-powered analysis of your Solana transactions
          </p>
        </div>

        {/* Main Card */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            overflow: "hidden",
            border: "1px solid #334155",
          }}
        >
          {/* Info Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
              padding: "30px",
              color: "white",
            }}
          >
            <h2
              style={{
                margin: "0 0 15px 0",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              How it works
            </h2>
            <ol style={{ paddingLeft: "20px", lineHeight: "1.8", margin: 0 }}>
              <li>Connect your Phantom wallet (Solana Devnet)</li>
              <li>
                Get free devnet USDC from{" "}
                <a
                  href="https://faucet.circle.com/"
                  target="_blank"
                  rel="noopener"
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Circle Faucet
                </a>
              </li>
              <li>Paste any Solana transaction hash from devnet</li>
              <li>Pay 0.001 USDC to get AI-powered analysis</li>
            </ol>
          </div>

          {/* Input Section */}
          <div style={{ padding: "30px" }}>
            <label
              htmlFor="tx-hash"
              style={{
                display: "block",
                marginBottom: "12px",
                fontWeight: "600",
                fontSize: "16px",
                color: "#e2e8f0",
              }}
            >
              Transaction Signature
            </label>
            <input
              id="tx-hash"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste Solana transaction hash here..."
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "2px solid #334155",
                boxSizing: "border-box",
                fontFamily: "monospace",
                transition: "border-color 0.2s",
                outline: "none",
                background: "#0f172a",
                color: "#e2e8f0",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
              onBlur={(e) => (e.target.style.borderColor = "#334155")}
            />

            <button
              onClick={handleMint}
              disabled={loading || !inputValue.trim()}
              style={{
                background:
                  loading || !inputValue.trim()
                    ? "#475569"
                    : "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                color: "white",
                border: "none",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "8px",
                cursor:
                  loading || !inputValue.trim() ? "not-allowed" : "pointer",
                width: "100%",
                marginTop: "20px",
                boxShadow:
                  loading || !inputValue.trim()
                    ? "none"
                    : "0 4px 15px rgba(14, 165, 233, 0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!loading && inputValue.trim()) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(14, 165, 233, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  loading || !inputValue.trim()
                    ? "none"
                    : "0 4px 15px rgba(14, 165, 233, 0.4)";
              }}
            >
              {loading
                ? "🔄 Analyzing Transaction..."
                : "✨ Analyze Transaction (0.001 USDC)"}
            </button>

            {/* Error Display */}
            {error && (
              <div
                style={{
                  background: "#7f1d1d",
                  color: "#fecaca",
                  padding: "16px",
                  borderRadius: "8px",
                  marginTop: "20px",
                  border: "1px solid #991b1b",
                  wordBreak: "break-word",
                }}
              >
                <strong>⚠️ Error:</strong> {error}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div
            style={{
              background: "#1e293b",
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              marginTop: "30px",
              overflow: "hidden",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                padding: "20px 30px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                📊 Transaction Analysis
              </h3>
            </div>

            <div style={{ padding: "30px" }}>
              {/* Transaction Type & Status Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "25px",
                }}
              >
                {/* Transaction Type */}
                {analysis.transactionType && (
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                        marginBottom: "8px",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Type
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        color: "#e2e8f0",
                        fontWeight: "600",
                        padding: "12px",
                        background: "#0f172a",
                        borderRadius: "6px",
                        border: "1px solid #334155",
                      }}
                    >
                      {analysis.transactionType}
                    </div>
                  </div>
                )}

                {/* Status */}
                {analysis.status && (
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                        marginBottom: "8px",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Status
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "12px 24px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "600",
                        background:
                          analysis.status.toLowerCase() === "success"
                            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                            : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        color: "white",
                      }}
                    >
                      {analysis.status.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>

              {/* Block Time & Fee Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "25px",
                }}
              >
                {/* Block Time */}
                {analysis.blockTime && (
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                        marginBottom: "8px",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Block Time
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        color: "#cbd5e1",
                        padding: "12px",
                        background: "#0f172a",
                        borderRadius: "6px",
                        fontFamily: "monospace",
                        border: "1px solid #334155",
                      }}
                    >
                      {new Date(analysis.blockTime).toLocaleString()}
                    </div>
                  </div>
                )}

                {/* Fee */}
                {analysis.fee && (
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                        marginBottom: "8px",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Transaction Fee
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        color: "#0ea5e9",
                        fontWeight: "600",
                        padding: "12px",
                        background: "#0f172a",
                        borderRadius: "6px",
                        border: "1px solid #334155",
                      }}
                    >
                      {analysis.fee}
                    </div>
                  </div>
                )}
              </div>

              {/* Signers */}
              {analysis.signers && analysis.signers.length > 0 && (
                <div style={{ marginBottom: "25px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      marginBottom: "12px",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    Signers ({analysis.signers.length})
                  </div>
                  {analysis.signers.map((signer, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: "14px",
                        fontFamily: "monospace",
                        background: "#0f172a",
                        padding: "12px 16px",
                        borderRadius: "6px",
                        marginBottom: "8px",
                        wordBreak: "break-all",
                        border: "1px solid #334155",
                        color: "#cbd5e1",
                      }}
                    >
                      {signer}
                    </div>
                  ))}
                </div>
              )}

              {/* Main Actions */}
              {analysis.mainActions && analysis.mainActions.length > 0 && (
                <div style={{ marginBottom: "25px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      marginBottom: "12px",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    Actions Performed
                  </div>
                  <div
                    style={{
                      background: "#0f172a",
                      padding: "16px",
                      borderRadius: "8px",
                      border: "1px solid #334155",
                    }}
                  >
                    <ul style={{ margin: 0, paddingLeft: "24px" }}>
                      {analysis.mainActions.map((action, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "15px",
                            color: "#cbd5e1",
                            marginBottom: "10px",
                            lineHeight: "1.6",
                          }}
                        >
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Summary */}
              {analysis.summary && (
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      marginBottom: "12px",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    AI Summary
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#e2e8f0",
                      lineHeight: "1.7",
                      background: "rgba(14, 165, 233, 0.1)",
                      padding: "20px",
                      borderRadius: "8px",
                      borderLeft: "4px solid #0ea5e9",
                    }}
                  >
                    {analysis.summary}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Raw Response (Fallback) */}
        {response && (
          <div
            style={{
              background: "#1e293b",
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              marginTop: "30px",
              padding: "30px",
              border: "1px solid #334155",
            }}
          >
            <strong style={{ fontSize: "18px", color: "#e2e8f0" }}>
              Raw Response:
            </strong>
            <pre
              style={{
                marginTop: "15px",
                background: "#0f172a",
                padding: "20px",
                borderRadius: "8px",
                overflow: "auto",
                fontSize: "13px",
                border: "1px solid #334155",
                color: "#cbd5e1",
              }}
            >
              {response}
            </pre>
          </div>
        )}

        {/* Footer Note */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#1e293b",
            borderRadius: "12px",
            fontSize: "14px",
            textAlign: "center",
            color: "#cbd5e1",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            border: "1px solid #334155",
          }}
        >
          Make sure you have{" "}
          <a
            href="https://phantom.app"
            target="_blank"
            rel="noopener"
            style={{
              color: "#0ea5e9",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Phantom Wallet
          </a>{" "}
          installed and connected to Solana Devnet with USDC tokens.
        </div>
        {/* Pitch Deck Link */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Link
            href="/pitch-deck"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              color: "white",
              background: "linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)",
              textDecoration: "none",
              boxShadow: "0 4px 15px rgba(14, 165, 233, 0.35)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(14, 165, 233, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(14, 165, 233, 0.35)";
            }}
          >
            📑 View Full Pitch Deck
          </Link>
        </div>
      </div>
    </div>
  );
}
