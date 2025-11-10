# Solana Transaction Summarizer 🔍

An AI-powered web application that provides intelligent analysis and summaries of Solana blockchain transactions. Users can input any Solana transaction hash from devnet, make a micro-payment in USDC, and receive a comprehensive AI-generated analysis of the transaction.

## 🌟 Features

- **AI-Powered Analysis**: Uses Groq's LLM to intelligently analyze and summarize Solana transactions
- **Pay-Per-Use Model**: Micro-payments of 0.001 USDC per transaction analysis using FareMeter
- **Beautiful UI**: Modern, gradient-rich interface with responsive design
- **Comprehensive Transaction Details**: View transaction type, status, fees, signers, actions, and AI summaries
- **Phantom Wallet Integration**: Seamless connection with Phantom wallet for payments
- **Solana Devnet**: Built for testing on Solana's devnet environment

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Payment**: FareMeter (pay-per-request middleware)
- **Blockchain**: Solana Web3.js, Phantom Wallet
- **AI**: Groq API (GPT-OSS-20B model)
- **Styling**: Inline CSS with modern gradients

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm/yarn/pnpm
- [Phantom Wallet](https://phantom.app/) browser extension
- Git

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Hemanthghs/sol-summary
cd sol-summary
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Your Solana wallet address that will receive payments
PAYTO_ADDRESS=your_solana_wallet_address_here

# FareMeter Configuration
FAREMETER_FACILITATOR_URL=https://facilitator.corbits.dev
FAREMETER_NETWORK=devnet

# Payment Configuration
ASSET=USDC
PAYMENT_AMOUNT=1000  # 0.001 USDC (6 decimals)

# Groq API Key (get from https://console.groq.com)
GROQ_API_KEY=your_groq_api_key_here
```

**How to get your API keys:**
- **GROQ_API_KEY**: Sign up at [Groq Console](https://console.groq.com) and create an API key
- **PAYTO_ADDRESS**: Use your Phantom wallet address (devnet) where you want to receive payments

### 4. Setup Phantom Wallet for Devnet

1. Install [Phantom Wallet](https://phantom.app/) browser extension
2. Open Phantom and go to Settings (gear icon)
3. Navigate to "Developer Settings"
4. Change "Network" to **Devnet**
5. Save changes

### 5. Get Devnet USDC Tokens

To use the application, you need devnet USDC tokens:

1. Visit [Circle's Devnet Faucet](https://faucet.circle.com/)
2. Select "Solana Devnet" network
3. Enter your Phantom wallet address
4. Request USDC tokens (you'll receive test tokens for free)

Alternatively, you can use:
- [Solana Faucet](https://faucet.solana.com/) for devnet SOL
- [SPL Token Faucet](https://spl-token-faucet.com/) for devnet USDC

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💡 How to Use

1. **Connect Wallet**: Ensure Phantom wallet is connected to Solana Devnet
2. **Get Test USDC**: Obtain free devnet USDC from the Circle faucet
3. **Find Transaction Hash**: Get any Solana transaction hash from [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)
4. **Enter Hash**: Paste the transaction signature into the input field
5. **Analyze**: Click "Analyze Transaction" and approve the 0.001 USDC payment in Phantom
6. **View Results**: See the AI-generated analysis with transaction details

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Main UI component
│   └── api/
│       └── summary/
│           └── route.ts      # API endpoint with FareMeter middleware
├── lib/
│   └── faremeter-client.ts   # FareMeter payment client setup
├── public/
├── .env.local                # Environment variables (create this)
└── package.json
```

## 🔑 Key Components

### Frontend (`page.tsx`)
- Transaction hash input interface
- Phantom wallet integration
- Payment processing via FareMeter
- Beautiful results display with structured data

### Backend API (`api/summary/route.ts`)
- FareMeter payment middleware
- Solana RPC transaction fetching
- Groq LLM integration for analysis
- JSON response formatting

### Payment Client (`lib/faremeter-client.ts`)
- Phantom wallet connection
- USDC balance checking
- Payment execution handling
- Error management

## 🎨 Transaction Analysis Fields

The AI provides structured analysis including:
- **Transaction Type**: Transfer, swap, mint, etc.
- **Status**: Success or failure indication
- **Block Time**: Human-readable timestamp
- **Transaction Fee**: Fee paid in SOL
- **Signers**: List of transaction signers
- **Main Actions**: Detailed list of operations performed
- **AI Summary**: Natural language description of the transaction

## 🛠️ Troubleshooting

### Common Issues

**"Phantom not found" error:**
- Ensure Phantom extension is installed
- Refresh the page after installation

**"Insufficient USDC" error:**
- Visit the Circle faucet to get devnet USDC
- Ensure you're on Solana Devnet in Phantom

**"Transaction not found" error:**
- Verify the transaction hash is from Solana devnet
- Check the transaction exists on [Solana Explorer](https://explorer.solana.com/?cluster=devnet)

**Payment not processing:**
- Confirm Phantom wallet is unlocked
- Check you have enough USDC (minimum 0.001 USDC)
- Ensure network is set to devnet


## Demo Screenshots
<img width="1538" height="780" alt="image" src="https://github.com/user-attachments/assets/95518b0d-ab73-4ebf-af52-bb6c17aeafda" />
<img width="1538" height="951" alt="image" src="https://github.com/user-attachments/assets/7673b3e6-97d6-4d47-bd15-eb1658d51b1d" />

