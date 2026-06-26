"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PaymentContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startPayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber }),
      });
      const data = (await response.json()) as { authorizationUrl?: string; error?: string };

      if (!response.ok || !data.authorizationUrl) {
        throw new Error(data.error || "Unable to start payment");
      }

      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start payment");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-card text-center max-w-lg mx-auto space-y-6 border border-brand-green/5">
      <div className="space-y-2">
        <h1 className="heading-md text-2xl font-bold text-brand-green">Complete Payment</h1>
        <p className="text-brand-muted font-sans text-sm">
          Your order has been saved. Continue to Paystack to complete payment.
        </p>
      </div>

      {orderNumber ? (
        <div className="bg-brand-cream border border-brand-green/10 rounded-xl p-4 font-mono text-sm text-brand-green font-bold">
          Order ID: {orderNumber}
        </div>
      ) : (
        <p className="text-red-500 font-sans text-sm">Missing order number.</p>
      )}

      {error ? <p className="text-red-500 font-sans text-sm">{error}</p> : null}

      <button
        type="button"
        disabled={!orderNumber || isLoading}
        onClick={startPayment}
        className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-sans font-semibold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-center block text-sm tracking-wide uppercase"
      >
        {isLoading ? "Starting Payment..." : "Pay with Paystack"}
      </button>

      <Link href="/cart" className="text-sm font-sans font-semibold text-brand-green hover:underline">
        Return to cart
      </Link>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-brand-light-bg">
        <div className="section-container">
          <Suspense fallback={null}>
            <PaymentContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
