"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  DollarSign,
  Brain,
  Rocket,
  TrendingUp,
} from "lucide-react";

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "Solana Transaction Summarizer",
      subtitle: "AI-Powered Blockchain Transaction Analysis",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="text-8xl mb-4">🔍</div>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Solana Transaction Summarizer
          </h1>
          <p className="text-3xl text-gray-300 max-w-3xl text-center">
            Making blockchain transactions understandable for everyone
          </p>
          <div className="flex gap-6 mt-8">
            <div className="flex items-center gap-2 text-cyan-400">
              <Brain size={32} />
              <span className="text-xl font-semibold">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Zap size={32} />
              <span className="text-xl font-semibold">Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <DollarSign size={32} />
              <span className="text-xl font-semibold">Micro-Payments</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "The Problem",
      content: (
        <div className="grid grid-cols-1 gap-8 h-full">
          <div>
            <h2 className="text-5xl font-bold mb-8 text-white">
              The Problem 🤔
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 p-8 rounded-2xl border-l-4 border-red-500">
                <h3 className="text-3xl font-bold text-red-300 mb-4">
                  Complex Transaction Data
                </h3>
                <p className="text-xl text-gray-300">
                  Blockchain transactions contain cryptic technical data that's
                  difficult for average users to understand
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-900/40 to-orange-800/40 p-8 rounded-2xl border-l-4 border-orange-500">
                <h3 className="text-3xl font-bold text-orange-300 mb-4">
                  Time-Consuming Analysis
                </h3>
                <p className="text-xl text-gray-300">
                  Users spend hours trying to decode transaction logs, signers,
                  and operations
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 p-8 rounded-2xl border-l-4 border-yellow-500">
                <h3 className="text-3xl font-bold text-yellow-300 mb-4">
                  Limited Accessibility
                </h3>
                <p className="text-xl text-gray-300">
                  Non-technical users struggle to audit their own transactions
                  and verify operations
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Our Solution",
      content: (
        <div className="h-full">
          <h2 className="text-5xl font-bold mb-8 text-white">
            Our Solution ✨
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                AI-Powered Analysis
              </h3>
              <p className="text-lg text-gray-300">
                Groq's LLM analyzes transaction data and provides human-readable
                summaries with key insights
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-purple-300 mb-4">
                Instant Results
              </h3>
              <p className="text-lg text-gray-300">
                Get comprehensive transaction analysis in seconds, not hours
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-8 rounded-2xl border border-green-500/30 hover:border-green-400 transition-all">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-green-300 mb-4">
                Pay-Per-Use Model
              </h3>
              <p className="text-lg text-gray-300">
                Only 0.001 USDC per analysis using FareMeter's micro-payment
                infrastructure
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 p-8 rounded-2xl border border-blue-500/30 hover:border-blue-400 transition-all">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-blue-300 mb-4">
                Structured Insights
              </h3>
              <p className="text-lg text-gray-300">
                View transaction type, status, fees, signers, actions, and
                AI-generated summaries
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "How It Works",
      content: (
        <div className="h-full">
          <h2 className="text-5xl font-bold mb-8 text-white">
            How It Works 🔄
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-start gap-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 rounded-xl border border-slate-600/30 hover:border-slate-500 transition-all">
              <div className="bg-cyan-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-2">
                  Connect Phantom Wallet
                </h3>
                <p className="text-lg text-gray-300">
                  User connects their Phantom wallet on Solana Devnet
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 rounded-xl border border-slate-600/30 hover:border-slate-500 transition-all">
              <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-2">
                  Enter Transaction Hash
                </h3>
                <p className="text-lg text-gray-300">
                  User pastes any Solana transaction signature from devnet
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 rounded-xl border border-slate-600/30 hover:border-slate-500 transition-all">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-300 mb-2">
                  Make Micro-Payment
                </h3>
                <p className="text-lg text-gray-300">
                  Pay 0.001 USDC via FareMeter's payment middleware
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 rounded-xl border border-slate-600/30 hover:border-slate-500 transition-all">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-2">
                  AI Analysis
                </h3>
                <p className="text-lg text-gray-300">
                  Groq LLM analyzes the transaction and generates insights
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 rounded-xl border border-slate-600/30 hover:border-slate-500 transition-all">
              <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-2xl font-bold text-pink-300 mb-2">
                  View Results
                </h3>
                <p className="text-lg text-gray-300">
                  Get comprehensive analysis with structured data and AI summary
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Tech Stack & Future",
      content: (
        <div className="h-full grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              Tech Stack 🛠️
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                <h4 className="text-xl font-bold text-cyan-400 mb-2">
                  Frontend
                </h4>
                <p className="text-gray-300">Next.js 14, React, TypeScript</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                <h4 className="text-xl font-bold text-purple-400 mb-2">
                  Blockchain
                </h4>
                <p className="text-gray-300">Solana Web3.js, Phantom Wallet</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                <h4 className="text-xl font-bold text-green-400 mb-2">
                  Payments
                </h4>
                <p className="text-gray-300">FareMeter Middleware, USDC</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                <h4 className="text-xl font-bold text-blue-400 mb-2">AI</h4>
                <p className="text-gray-300">Groq API (GPT-OSS-20B)</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              Future Roadmap 🚀
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-cyan-900/30 to-cyan-800/30 p-4 rounded-xl border-l-4 border-cyan-500">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket size={24} className="text-cyan-400" />
                  <h4 className="text-xl font-bold text-cyan-300">
                    Mainnet Launch
                  </h4>
                </div>
                <p className="text-gray-300">Deploy to Solana mainnet-beta</p>
              </div>

              <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 p-4 rounded-xl border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <Brain size={24} className="text-purple-400" />
                  <h4 className="text-xl font-bold text-purple-300">
                    Advanced AI Models
                  </h4>
                </div>
                <p className="text-gray-300">
                  Integrate multiple AI models for deeper analysis
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 p-4 rounded-xl border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={24} className="text-green-400" />
                  <h4 className="text-xl font-bold text-green-300">
                    Batch Analysis
                  </h4>
                </div>
                <p className="text-gray-300">
                  Analyze multiple transactions at once
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-4 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={24} className="text-blue-400" />
                  <h4 className="text-xl font-bold text-blue-300">
                    Real-time Monitoring
                  </h4>
                </div>
                <p className="text-gray-300">
                  Watch and analyze transactions in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (currentSlide < slides.length - 1) {
          nextSlide();
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (currentSlide > 0) {
          prevSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-700/50 p-12 min-h-[600px]">
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pb-8 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="bg-slate-700/50 hover:bg-slate-600/50 text-white p-4 rounded-full transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-12 bg-gradient-to-r from-cyan-400 to-blue-500"
                    : "w-3 bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-slate-700/50 hover:bg-slate-600/50 text-white p-4 rounded-full transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-4 text-slate-400 text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
}
