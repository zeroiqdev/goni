"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || "";
  const orderNumber = searchParams.get("orderNumber") || "";
  const [status, setStatus] = useState<"loading" | "paid" | "failed">("loading");
  const [message, setMessage] = useState("Confirming your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams({ reference, orderNumber });
        const response = await fetch(`/api/paystack/verify?${params.toString()}`);
        const data = (await response.json()) as { paid?: boolean; error?: string };

        if (!response.ok) throw new Error(data.error || "Unable to verify payment");

        setStatus(data.paid ? "paid" : "failed");
        setMessage(
          data.paid
            ? "Payment confirmed. We are processing your order."
            : "We could not confirm a successful payment for this order.",
        );
      } catch (err) {
        setStatus("failed");
        setMessage(err instanceof Error ? err.message : "Unable to verify payment");
      }
    };

    if (reference && orderNumber) {
      verifyPayment();
    } else {
      setStatus("failed");
      setMessage("Missing payment reference or order number.");
    }
  }, [orderNumber, reference]);

  return (
    <div className="bg-white rounded-2xl p-10 shadow-card text-center max-w-lg mx-auto space-y-6 border border-brand-green/5">
      <div className="space-y-2">
        <h1 className="heading-md text-2xl font-bold text-brand-green">
          {status === "loading" ? "Verifying Payment" : status === "paid" ? "Payment Confirmed" : "Payment Not Confirmed"}
        </h1>
        <p className="text-brand-muted font-sans text-sm">{message}</p>
      </div>

      {orderNumber ? (
        <div className="bg-brand-cream border border-brand-green/10 rounded-xl p-4 font-mono text-sm text-brand-green font-bold">
          Order ID: {orderNumber}
        </div>
      ) : null}

      <Link href={status === "paid" ? "/" : `/payment?orderNumber=${encodeURIComponent(orderNumber)}`} className="btn-primary block text-center">
        {status === "paid" ? "Continue Shopping" : "Try Payment Again"}
      </Link>
    </div>
  );
}

export default function VerifyPaymentPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-brand-light-bg">
        <div className="section-container">
          <Suspense fallback={null}>
            <VerifyPaymentContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
