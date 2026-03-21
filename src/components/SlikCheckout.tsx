"use client";

import { useState, useRef } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMerchantPayment } from "@slik-pay/sdk/react";

// TODO: replace with real merchant wallet pubkey
const MERCHANT_WALLET = "9PVgQbupVzwknAo6BDMZXF6tVx4M58SRQepUtxPw14Ty";

interface SlikCheckoutProps {
  amountSol: number;
  label: string;
}

export function SlikCheckout({ amountSol, label }: SlikCheckoutProps) {
  const { connection } = useConnection();
  const [codeInput, setCodeInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    status,
    paymentId,
    error,
    createPayment,
    linkCode,
    reset,
  } = useMerchantPayment({ apiBaseUrl: "/api", connection });

  const handleBuy = async () => {
    await createPayment(amountSol, MERCHANT_WALLET);
  };

  const handleSubmitCode = async () => {
    if (codeInput.length !== 6) return;
    await linkCode(codeInput);
  };

  const handleReset = () => {
    setCodeInput("");
    reset();
  };

  // PAID
  if (status === "paid") {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-2xl font-headline font-bold text-secondary">Payment confirmed!</p>
        <p className="text-on-surface-variant">You now have access to this course.</p>
      </div>
    );
  }

  // CONFIRMING - waiting for on-chain confirmation
  if (status === "confirming") {
    return (
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-on-surface-variant">Waiting for confirmation on Solana...</p>
        <p className="text-on-surface-variant/50 text-xs">The buyer is signing the transaction in their wallet</p>
      </div>
    );
  }

  // LINKED - code matched, waiting for buyer to confirm in wallet
  if (status === "linked") {
    return (
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-on-surface-variant">Code linked! Waiting for buyer to confirm in wallet...</p>
      </div>
    );
  }

  // AWAITING_CODE - payment created, show code input
  if (status === "awaiting_code") {
    return (
      <div className="text-center space-y-6">
        <p className="text-on-surface-variant text-sm">Enter your 6-digit SLIK code</p>
        <div className="flex justify-center gap-2">
          <input
            ref={inputRef}
            type="text"
            maxLength={6}
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitCode()}
            placeholder="000000"
            className="w-48 text-center text-3xl font-headline font-bold tracking-[0.3em] bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            autoFocus
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleSubmitCode}
            disabled={codeInput.length !== 6}
            className="kinetic-gradient text-on-primary-container px-8 py-3 font-bold text-sm active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm Code
          </button>
          <button onClick={handleReset} className="text-on-surface-variant text-xs underline">
            Cancel
          </button>
        </div>
        <p className="text-on-surface-variant/50 text-xs">
          Generate a code in your SLIK wallet, then enter it here
        </p>
      </div>
    );
  }

  // ERROR
  if (status === "error") {
    return (
      <div className="text-center space-y-4">
        <p className="text-error text-sm">{error || "Something went wrong"}</p>
        <button onClick={handleReset} className="text-primary text-sm underline">
          Try again
        </button>
      </div>
    );
  }

  // EXPIRED
  if (status === "expired") {
    return (
      <div className="text-center space-y-4">
        <p className="text-on-surface-variant">Payment expired.</p>
        <button onClick={handleBuy} className="text-primary underline">
          Try again
        </button>
      </div>
    );
  }

  // IDLE - show buy button
  return (
    <button
      onClick={handleBuy}
      className="kinetic-gradient text-on-primary-container px-10 py-5 font-headline font-bold text-xl active:scale-95 transition-all"
    >
      {label} — {amountSol} SOL
    </button>
  );
}
