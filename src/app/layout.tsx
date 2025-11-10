import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SolSummary | AI Transaction Summaries for Solana",
  description: "Analyze Solana transactions, pay in USDC, and get instant AI-generated summaries.",
   icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
