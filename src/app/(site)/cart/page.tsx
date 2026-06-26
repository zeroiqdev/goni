"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartContext";
import { useAuth } from "@/providers/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PickupHub = {
  id: number;
  name: string;
  address?: string;
};

type AuthStep = "email-check" | "login" | "register" | "authenticated";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user, isLoading: isAuthLoading, login, register, checkEmail } = useAuth();

  // Auth gate state
  const [authStep, setAuthStep] = useState<AuthStep>("email-check");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authFirstName, setAuthFirstName] = useState("");
  const [authLastName, setAuthLastName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  // Checkout state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>(["Nigeria"]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const [deliveryEta, setDeliveryEta] = useState<string | null>(null);
  const [pickupHubs, setPickupHubs] = useState<PickupHub[]>([]);
  const [form, setForm] = useState({
    address: "",
    country: "Nigeria",
    city: "",
    state: "",
  });

  // Set auth step based on user state
  useEffect(() => {
    if (!isAuthLoading && user) {
      setAuthStep("authenticated");
      // Pre-fill delivery address from user profile
      if (user.address) {
        setForm((prev) => ({
          ...prev,
          country: user.address?.country || prev.country,
          state: user.address?.state || prev.state,
          city: user.address?.city || prev.city,
          address: user.address?.streetAddress || prev.address,
        }));
      }
    }
  }, [isAuthLoading, user]);

  const parseWeightKg = (weight: string) => {
    const match = weight.toLowerCase().match(/(\d+(?:\.\d+)?)\s*(kg|kilogram|kilograms|g|gram|grams)\b/);
    if (!match) return 0;

    const value = Number(match[1]);
    if (!Number.isFinite(value) || value <= 0) return 0;

    return match[2].startsWith("kg") || match[2].startsWith("kilogram") ? value : value / 1000;
  };

  const cartWeightKg = useMemo(
    () => cart.reduce((total, item) => total + parseWeightKg(item.weight) * item.quantity, 0),
    [cart],
  );
  const orderTotal = cartTotal + (shippingFee ?? 0);
  const isNigeriaDelivery = form.country.trim().toLowerCase() === "nigeria";
  const hasCalculatedShipping = isNigeriaDelivery && shippingFee !== null && shippingFee > 0;

  // --- Auth handlers ---
  const handleEmailCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) return;
    setIsAuthSubmitting(true);
    setAuthError(null);
    try {
      const exists = await checkEmail(authEmail.trim());
      setAuthStep(exists ? "login" : "register");
    } catch {
      setAuthError("Could not check email. Please try again.");
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthSubmitting(true);
    setAuthError(null);
    try {
      await login(authEmail.trim(), authPassword);
      setAuthStep("authenticated");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed. Check your password.");
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authPassword.length < 6) {
      setAuthError("Password must be at least 6 characters");
      return;
    }
    setIsAuthSubmitting(true);
    setAuthError(null);
    try {
      await register({
        email: authEmail.trim(),
        password: authPassword,
        firstName: authFirstName.trim(),
        lastName: authLastName.trim(),
        phone: authPhone.trim() || undefined,
      });
      setAuthStep("authenticated");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  // --- Location / delivery effects (same as before) ---
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch("/api/locations?action=countries");
        const data = (await response.json()) as { countries?: string[] };
        if (data.countries?.length) setCountries(data.countries);
      } catch (err) {
        console.error("Could not load countries:", err);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    if (!form.country) {
      setStates([]);
      return;
    }
    const controller = new AbortController();
    const loadStates = async () => {
      setIsLoadingStates(true);
      try {
        const params = new URLSearchParams({ action: "states", country: form.country });
        const response = await fetch(`/api/locations?${params.toString()}`, { signal: controller.signal });
        const data = (await response.json()) as { states?: string[] };
        setStates(data.states || []);
      } catch (err) {
        if (!controller.signal.aborted) console.error("Could not load states:", err);
      } finally {
        if (!controller.signal.aborted) setIsLoadingStates(false);
      }
    };
    loadStates();
    return () => controller.abort();
  }, [form.country]);

  useEffect(() => {
    if (!form.country || !form.state) {
      setCities([]);
      return;
    }
    const controller = new AbortController();
    const loadCities = async () => {
      setIsLoadingCities(true);
      try {
        const params = new URLSearchParams({ action: "cities", country: form.country, state: form.state });
        const response = await fetch(`/api/locations?${params.toString()}`, { signal: controller.signal });
        const data = (await response.json()) as { cities?: string[] };
        setCities(data.cities || []);
      } catch (err) {
        if (!controller.signal.aborted) console.error("Could not load cities:", err);
      } finally {
        if (!controller.signal.aborted) setIsLoadingCities(false);
      }
    };
    loadCities();
    return () => controller.abort();
  }, [form.country, form.state]);

  useEffect(() => {
    if (!isNigeriaDelivery || !form.state || !form.city) {
      setShippingFee(null);
      setShippingError(
        form.country && !isNigeriaDelivery
          ? "Delivery pricing is currently available for Nigeria only."
          : null,
      );
      setDeliveryEta(null);
      setPickupHubs([]);
      return;
    }
    const controller = new AbortController();
    const loadShippingFee = async () => {
      setIsLoadingShipping(true);
      setShippingFee(null);
      setShippingError(null);
      setDeliveryEta(null);
      setPickupHubs([]);
      try {
        const costResponse = await fetch("/api/delivery/cost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: form.state, weight: cartWeightKg }),
          signal: controller.signal,
        });
        const data = (await costResponse.json()) as { shippingFee?: number; error?: string };
        const nextShippingFee = Number(data.shippingFee);
        if (!costResponse.ok || !Number.isFinite(nextShippingFee) || nextShippingFee <= 0) {
          setShippingError(data.error || "Could not calculate delivery fee. Please try again.");
          return;
        }
        setShippingFee(nextShippingFee);
        const [estimateResponse, hubsResponse] = await Promise.all([
          fetch("/api/delivery/estimate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state: form.state }),
            signal: controller.signal,
          }),
          fetch(`/api/delivery/pickup-hubs?${new URLSearchParams({ state: form.state }).toString()}`, {
            signal: controller.signal,
          }),
        ]);
        const estimateData = (await estimateResponse.json()) as { eta?: string | null };
        setDeliveryEta(estimateData.eta || null);
        const hubsData = (await hubsResponse.json()) as { hubs?: PickupHub[] };
        setPickupHubs(Array.isArray(hubsData.hubs) ? hubsData.hubs : []);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Could not calculate shipping:", err);
          setShippingError(
            err instanceof Error ? err.message : "Could not calculate delivery fee. Please try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoadingShipping(false);
      }
    };
    loadShippingFee();
    return () => controller.abort();
  }, [cartWeightKg, form.city, form.country, form.state, isNigeriaDelivery]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "country") return { ...prev, country: value, state: "", city: "" };
      if (name === "state") return { ...prev, state: value, city: "" };
      return { ...prev, [name]: value };
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !user) return;
    if (cart.some((item) => item.id.startsWith("fb-"))) {
      alert("Some cart items are no longer available. Please remove them and add the products again from the shop.");
      return;
    }
    if (!hasCalculatedShipping) {
      alert(shippingError || "Please wait for delivery fee calculation before placing your order.");
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);

    try {
      const orderNumber = `GONI-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderData = {
        orderNumber,
        user: user.id,
        items: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        customer: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone || "",
          address: form.address,
          country: form.country,
          city: form.city,
          state: form.state,
        },
        deliveryAddress: {
          country: form.country,
          state: form.state,
          city: form.city,
          streetAddress: form.address,
        },
        shippingFee,
        total: orderTotal,
        status: "pending",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
        signal: controller.signal,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { errors?: Array<{ message?: string }>; message?: string } | null;
        throw new Error(data?.errors?.[0]?.message || data?.message || "Could not save order. Please try again.");
      }

      clearCart();
      router.push(`/payment?orderNumber=${encodeURIComponent(orderNumber)}`);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert(
        err instanceof DOMException && err.name === "AbortError"
          ? "Order submission timed out. Please check your connection and try again."
          : err instanceof Error
            ? err.message
            : "Checkout failed. Please try again.",
      );
    } finally {
      window.clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-brand-light-bg border border-brand-green/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green/30 font-sans";

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-brand-light-bg" id="cart-page">
        <div className="section-container">
          <h1 className="heading-lg text-brand-green mb-10 font-bold">Shopping Cart</h1>

          {orderSuccess ? (
            <div className="bg-white rounded-2xl p-10 shadow-card text-center max-w-lg mx-auto space-y-6 border border-brand-green/5 animate-fade-in">
              <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto text-brand-green">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="heading-md text-2xl font-bold">Order Confirmed!</h2>
                <p className="text-brand-muted font-sans text-sm">
                  Thank you for shopping with Goni&apos;s Shea Butter. We are processing your order.
                </p>
              </div>
              <div className="bg-brand-cream border border-brand-green/10 rounded-xl p-4 font-mono text-sm text-brand-green font-bold">
                Order ID: {orderSuccess}
              </div>
              <Link href="/" className="btn-primary block text-center">
                Continue Shopping
              </Link>
            </div>
          ) : cart.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-card text-center max-w-md mx-auto space-y-6 border border-brand-green/5">
              <div className="w-16 h-16 bg-brand-green/5 rounded-full flex items-center justify-center mx-auto text-brand-green/60">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="heading-md text-xl font-bold">Your cart is empty</h3>
                <p className="text-brand-muted font-sans text-sm">
                  Add some unrefined shea butter products to get started.
                </p>
              </div>
              <Link href="/shop" className="btn-primary inline-flex">
                Explore Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Cart Items */}
              <div className="lg:col-span-7 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-5 shadow-card border border-brand-green/5 flex items-center gap-4 hover:shadow-card-hover transition-all duration-300"
                    id={`cart-item-${item.slug}`}
                  >
                    <div className="relative w-20 h-20 rounded-xl bg-brand-cream overflow-hidden flex-shrink-0">
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-grow min-w-0 space-y-1">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-brand-muted block">
                        {item.weight}
                      </span>
                      <h4 className="font-serif font-bold text-brand-dark text-base line-clamp-1">{item.title}</h4>
                      <p className="font-sans text-sm font-semibold text-brand-green">₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center border border-brand-green/10 rounded-lg overflow-hidden bg-brand-light-bg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1.5 hover:bg-brand-green/5 text-brand-dark transition-colors" aria-label="Decrease quantity">-</button>
                      <span className="px-3 font-sans text-sm font-semibold text-brand-dark">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1.5 hover:bg-brand-green/5 text-brand-dark transition-colors" aria-label="Increase quantity">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors" aria-label="Remove item">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Details & Summary */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 shadow-card border border-brand-green/5 space-y-6">
                {/* AUTH GATE */}
                {authStep !== "authenticated" && !isAuthLoading && (
                  <div className="space-y-4" id="checkout-auth-gate">
                    <h3 className="heading-md text-xl font-bold border-b border-brand-green/5 pb-4">
                      {authStep === "email-check" && "Sign in to Checkout"}
                      {authStep === "login" && "Welcome Back"}
                      {authStep === "register" && "Create Your Account"}
                    </h3>

                    {authError && (
                      <p className="text-red-500 text-sm font-sans bg-red-50 rounded-lg px-3 py-2">{authError}</p>
                    )}

                    {/* Email Check Step */}
                    {authStep === "email-check" && (
                      <form onSubmit={handleEmailCheck} className="space-y-4">
                        <p className="text-brand-muted font-sans text-sm">
                          Enter your email address to continue.
                        </p>
                        <div className="space-y-1.5">
                          <label className="text-xs font-sans font-semibold text-brand-muted">Email</label>
                          <input
                            type="email"
                            required
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            className={inputClass}
                            placeholder="your@email.com"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isAuthSubmitting}
                          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-sans font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 text-sm"
                        >
                          {isAuthSubmitting ? "Checking..." : "Continue"}
                        </button>
                      </form>
                    )}

                    {/* Login Step */}
                    {authStep === "login" && (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <p className="text-brand-muted font-sans text-sm">
                          An account exists for <strong className="text-brand-dark">{authEmail}</strong>. Enter your password to continue.
                        </p>
                        <div className="space-y-1.5">
                          <label className="text-xs font-sans font-semibold text-brand-muted">Password</label>
                          <input
                            type="password"
                            required
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className={inputClass}
                            placeholder="Your password"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isAuthSubmitting}
                          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-sans font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 text-sm"
                        >
                          {isAuthSubmitting ? "Signing in..." : "Sign In & Continue"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setAuthStep("email-check"); setAuthError(null); }}
                          className="w-full text-brand-muted text-xs font-sans hover:text-brand-dark transition-colors"
                        >
                          ← Use a different email
                        </button>
                      </form>
                    )}

                    {/* Register Step */}
                    {authStep === "register" && (
                      <form onSubmit={handleRegister} className="space-y-4">
                        <p className="text-brand-muted font-sans text-sm">
                          No account found for <strong className="text-brand-dark">{authEmail}</strong>. Create one to continue.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-sans font-semibold text-brand-muted">First Name</label>
                            <input type="text" required value={authFirstName} onChange={(e) => setAuthFirstName(e.target.value)} className={inputClass} placeholder="First Name" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-sans font-semibold text-brand-muted">Last Name</label>
                            <input type="text" required value={authLastName} onChange={(e) => setAuthLastName(e.target.value)} className={inputClass} placeholder="Last Name" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-sans font-semibold text-brand-muted">Phone</label>
                          <input type="tel" value={authPhone} onChange={(e) => setAuthPhone(e.target.value)} className={inputClass} placeholder="Phone number (optional)" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-sans font-semibold text-brand-muted">Password</label>
                          <input type="password" required minLength={6} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className={inputClass} placeholder="Create a password (min 6 chars)" />
                        </div>
                        <button
                          type="submit"
                          disabled={isAuthSubmitting}
                          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-sans font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 text-sm"
                        >
                          {isAuthSubmitting ? "Creating account..." : "Create Account & Continue"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setAuthStep("email-check"); setAuthError(null); }}
                          className="w-full text-brand-muted text-xs font-sans hover:text-brand-dark transition-colors"
                        >
                          ← Use a different email
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* DELIVERY FORM — only shown when authenticated */}
                {authStep === "authenticated" && user && (
                  <>
                    <h3 className="heading-md text-xl font-bold border-b border-brand-green/5 pb-4">
                      Delivery Details
                    </h3>

                    <form onSubmit={handleCheckout} className="space-y-4" id="checkout-form">
                      {/* Read-only customer info from account */}
                      <div className="bg-brand-cream/50 rounded-xl p-4 space-y-1 border border-brand-green/5">
                        <p className="text-xs font-sans font-semibold text-brand-muted">Shipping to:</p>
                        <p className="text-sm font-sans font-semibold text-brand-dark">{user.firstName} {user.lastName}</p>
                        <p className="text-xs font-sans text-brand-muted">{user.email} {user.phone ? `• ${user.phone}` : ""}</p>
                      </div>

                      {/* Delivery address fields */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-semibold text-brand-muted">Country</label>
                        <select name="country" required value={form.country} onChange={handleInputChange} className={inputClass}>
                          <option value="">Select country</option>
                          {countries.map((country) => (<option key={country} value={country}>{country}</option>))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-sans font-semibold text-brand-muted">State</label>
                          <select name="state" required value={form.state} onChange={handleInputChange} className={inputClass} disabled={!form.country || isLoadingStates}>
                            <option value="">{isLoadingStates ? "Loading states..." : "Select state"}</option>
                            {states.map((state) => (<option key={state} value={state}>{state}</option>))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-sans font-semibold text-brand-muted">City</label>
                          <select name="city" required value={form.city} onChange={handleInputChange} className={inputClass} disabled={!form.state || isLoadingCities}>
                            <option value="">{isLoadingCities ? "Loading cities..." : "Select city"}</option>
                            {cities.map((city) => (<option key={city} value={city}>{city}</option>))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-semibold text-brand-muted">Exact House Address</label>
                        <textarea
                          name="address"
                          required
                          rows={2}
                          value={form.address}
                          onChange={handleInputChange}
                          className={`${inputClass} resize-none`}
                          placeholder="House number, street, estate, apartment, landmark"
                        />
                      </div>

                      {/* Order summary */}
                      <div className="border-t border-brand-green/5 pt-6 space-y-3">
                        <div className="flex justify-between text-sm font-sans text-brand-muted">
                          <span>Subtotal</span>
                          <span>₦{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-sans text-brand-muted">
                          <span>Shipping</span>
                          <span className="text-brand-green font-semibold">
                            {isLoadingShipping
                              ? "Calculating..."
                              : shippingFee !== null
                                ? `₦${shippingFee.toLocaleString()}`
                                : shippingError || "Select state and city"}
                          </span>
                        </div>
                        {deliveryEta ? (
                          <div className="flex justify-between text-sm font-sans text-brand-muted">
                            <span>Estimated delivery</span>
                            <span className="text-brand-green font-semibold">{deliveryEta}</span>
                          </div>
                        ) : null}
                        {pickupHubs.length > 0 ? (
                          <div className="rounded-xl border border-brand-green/10 bg-brand-light-bg p-3 font-sans text-xs text-brand-muted space-y-2">
                            <p className="font-semibold text-brand-green">Pickup hubs near this state</p>
                            <div className="space-y-1.5">
                              {pickupHubs.slice(0, 3).map((hub) => (
                                <div key={hub.id}>
                                  <span className="font-semibold text-brand-dark">{hub.name}</span>
                                  {hub.address ? <span> - {hub.address}</span> : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                        <div className="flex justify-between border-t border-brand-green/5 pt-4 text-base font-bold text-brand-dark">
                          <span>Total Amount</span>
                          <span>₦{orderTotal.toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || isLoadingShipping || !hasCalculatedShipping}
                        className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-sans font-semibold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-center block text-sm tracking-wide uppercase mt-6"
                        id="submit-order-btn"
                      >
                        {isSubmitting ? "Processing Order..." : "Confirm & Place Order"}
                      </button>
                    </form>
                  </>
                )}

                {/* Loading state while checking auth */}
                {isAuthLoading && (
                  <div className="py-8 text-center">
                    <p className="text-brand-muted font-sans text-sm animate-pulse">Loading...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
