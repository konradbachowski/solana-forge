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

export function SlikCheckout({ amountSol, label }: SlikCheckoutProps) {
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

  // Customer side - generates code, polls for link
  const {
    code,
    status: codeStatus,
    linkedPayment,
    generate,
    reset: resetCode,
  } = usePaymentCode({ apiBaseUrl: "/api" });

  // Customer side - signs and sends TX
  const {
    status: payStatus,
    pay,
    reset: resetPay,
  } = useSlikPay();

  const handleStart = async () => {
    // Step 1: merchant creates payment
    await createPayment(amountSol, MERCHANT_WALLET);
    setStep("generate");
  };

  const handleGenerate = async () => {
    if (!publicKey) return;
    await generate(publicKey.toBase58());
  };

  const handleSubmitCode = async () => {
    if (codeInput.length !== 6) return;
    await linkCode(codeInput);
  };

  const handlePay = async () => {
    if (!publicKey || !linkedPayment || !sendTransaction) return;
    setStep("paying");
    await pay({
      paymentId: linkedPayment.paymentId,
      apiBaseUrl: "/api",
      customerPubkey: publicKey,
      connection,
      sendTransaction,
    });
  };

  const handleReset = () => {
    setStep("idle");
    setCodeInput("");
    resetMerchant();
    resetCode();
    resetPay();
  };

  // === PAID ===
  if (merchantStatus === "paid" || payStatus === "paid") {
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
  if (step === "paying" || payStatus === "building" || payStatus === "signing" || payStatus === "confirming") {
    return (
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-on-surface-variant">
          {payStatus === "building" && "Building transaction..."}
          {payStatus === "signing" && "Sign in your wallet..."}
          {payStatus === "confirming" && "Confirming on Solana..."}
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

  // === CODE GENERATED - show code and wait for link ===
  if (step === "generate" && codeStatus === "active" && code) {
    return (
      <div className="text-center space-y-6">
        <p className="text-on-surface-variant text-sm">Your SLIK code:</p>
        <div className="text-5xl font-headline font-bold text-primary tracking-[0.3em]">{code}</div>
        <p className="text-on-surface-variant text-xs">Enter this code below to complete purchase</p>
        <div className="flex justify-center gap-2">
          <input
            type="text"
            maxLength={6}
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitCode()}
            placeholder="Enter code"
            className="w-48 text-center text-2xl font-headline font-bold tracking-[0.2em] bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary outline-none"
            autoFocus
          />
        </div>
        <button
          onClick={handleSubmitCode}
          disabled={codeInput.length !== 6}
          className="kinetic-gradient text-on-primary-container px-8 py-3 font-bold text-sm active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm Code
        </button>
        <button onClick={handleReset} className="text-on-surface-variant text-xs underline block mx-auto">Cancel</button>
      </div>
    );
  }

  // === CODE LINKED - ready to pay ===
  if (codeStatus === "linked" && linkedPayment) {
    return (
      <div className="text-center space-y-4">
        <p className="text-on-surface-variant">Payment ready:</p>
        <div className="text-3xl font-headline font-bold">{linkedPayment.amount} SOL</div>
        <button
          onClick={handlePay}
          className="kinetic-gradient text-on-primary-container px-10 py-4 font-bold text-lg active:scale-95 transition-all"
        >
          Confirm & Pay
        </button>
        <button onClick={handleReset} className="text-on-surface-variant text-xs underline block mx-auto">Cancel</button>
      </div>
    );
  }

  // === AWAITING CODE - payment created, need to generate or enter code ===
  if (merchantStatus === "awaiting_code" && step === "generate") {
    if (!publicKey) {
      return (
        <div className="text-center space-y-4">
          <p className="text-on-surface-variant text-sm">Connect wallet to generate your SLIK code</p>
          <WalletMultiButton />
          <button onClick={handleReset} className="text-on-surface-variant text-xs underline">Cancel</button>
        </div>
      );
    }

    if (codeStatus === "generating") {
      return (
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-on-surface-variant">Generating code...</p>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <p className="text-on-surface-variant text-sm">Payment created for {amountSol} SOL</p>
        <button
          onClick={handleGenerate}
          className="kinetic-gradient text-on-primary-container px-8 py-4 font-bold text-lg active:scale-95 transition-all"
        >
          Generate SLIK Code
        </button>
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
  if (merchantStatus === "error" || payStatus === "error" || codeStatus === "expired") {
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
