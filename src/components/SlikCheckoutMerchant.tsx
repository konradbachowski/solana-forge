"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMerchantPayment, usePaymentCode, useSlikPay } from "@slik-pay/sdk/react";

const MERCHANT_WALLET = "9PVgQbupVzwknAo6BDMZXF6tVx4M58SRQepUtxPw14Ty";

interface SlikCheckoutProps {
  amountSol: number;
  label: string;
}

export function SlikCheckoutMerchant({ amountSol, label }: SlikCheckoutProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [codeInput, setCodeInput] = useState("");
  const [step, setStep] = useState<"idle" | "generate" | "enter" | "paying">("idle");

  // Merchant side - creates payment, links code, watches for confirmation
  const {
    status: merchantStatus,
    error: merchantError,
    createPayment,
    linkCode,
    reset: resetMerchant,
  } = useMerchantPayment({ apiBaseUrl: "/api", connection });

  const handleStart = async () => {
    // Step 1: merchant creates payment
    await createPayment(amountSol, MERCHANT_WALLET);
    setStep("generate");
  };

  const handleSubmitCode = async () => {
    if (codeInput.length !== 6) return;
    await linkCode(codeInput);
  };

  const handleReset = () => {
    setStep("idle");
    setCodeInput("");
    resetMerchant();
  };

  // === PAID ===
  if (merchantStatus === "paid") {
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

  // === PAYING (signing TX) ===
  if (step === "paying") {
    return (
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-on-surface-variant">
        </p>
      </div>
    );
  }

  // === CONFIRMING (merchant watching for on-chain receipt) ===
  if (merchantStatus === "confirming" || merchantStatus === "linked") {
    return (
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-on-surface-variant">Code accepted! Waiting for payment confirmation...</p>
        <p className="text-on-surface-variant/50 text-xs">Complete the payment in your SLIK wallet</p>
      </div>
    );
  }

  // === AWAITING CODE - payment created, need to generate or enter code ===
  if (merchantStatus === "awaiting_code") {
    if (!publicKey) {
      return (
        <div className="text-center space-y-4">
          <p className="text-on-surface-variant text-sm">Connect wallet to generate your SLIK code</p>
          <WalletMultiButton />
          <button onClick={handleReset} className="text-on-surface-variant text-xs underline">Cancel</button>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <p className="text-on-surface-variant text-sm">Payment created for {amountSol} SOL</p>

        <p className="text-on-surface-variant/50 text-xs">Or enter a code from your SLIK wallet</p>
        <div className="flex justify-center gap-2">
          <input
            type="text"
            maxLength={6}
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitCode()}
            placeholder="000000"
            className="w-40 text-center text-xl font-headline font-bold tracking-[0.2em] bg-surface-container-lowest border border-outline-variant/30 px-3 py-2 text-on-surface focus:ring-2 focus:ring-primary outline-none"
          />
          <button
            onClick={handleSubmitCode}
            disabled={codeInput.length !== 6}
            className="bg-surface-container-highest px-4 py-2 font-bold text-xs uppercase hover:bg-primary hover:text-on-primary transition-all disabled:opacity-40"
          >
            Submit
          </button>
        </div>
        <button onClick={handleReset} className="text-on-surface-variant text-xs underline">Cancel</button>
      </div>
    );
  }

  // === ERROR ===
  if (merchantStatus === "error") {
    return (
      <div className="text-center space-y-4">
        <p className="text-error text-sm">{merchantError || "Code expired or something went wrong"}</p>
        <button onClick={handleReset} className="text-primary text-sm underline">Try again</button>
      </div>
    );
  }

  // === IDLE ===
  return (
    <button
      onClick={handleStart}
      className="kinetic-gradient text-on-primary-container px-10 py-5 font-headline font-bold text-xl active:scale-95 transition-all"
    >
      {label} — {amountSol} SOL
    </button>
  );
}
