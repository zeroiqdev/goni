"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function RequiredMark() {
  return <span className="ml-1 align-baseline text-base leading-none text-[#d92d20]">*</span>;
}

function WholesaleFormInner() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phoneCode: "+234",
    phone: "",
    address: "",
    product: "",
    quantity: "",
    purpose: "",
    deliveryOption: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  // Pre-select product from query parameter
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      // Map display title to option value if applicable
      const lower = productParam.toLowerCase();
      if (lower.includes("200g") || lower.includes("whipped")) {
        setFormData((prev) => ({ ...prev, product: "200g-whipped" }));
      } else if (lower.includes("1kg") || lower.includes("pouch")) {
        setFormData((prev) => ({ ...prev, product: "1kg-pouch" }));
      } else if (lower.includes("15kg") || lower.includes("bucket")) {
        setFormData((prev) => ({ ...prev, product: "15kg-bucket" }));
      } else {
        setFormData((prev) => ({ ...prev, product: "mixed-order" }));
      }
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const {
      fullName,
      businessName,
      email,
      phoneCode,
      phone,
      address,
      product,
      quantity,
      purpose,
      deliveryOption,
      message,
    } = formData;

    if (!fullName || !businessName || !email || !phone || !address || !product || !quantity || !purpose) {
      setStatus("error");
      setResponseMsg("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setResponseMsg("");

    const fullPhoneNumber = `${phoneCode} ${phone}`;

    try {
      const response = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "wholesale",
          fullName,
          businessName,
          email,
          phone: fullPhoneNumber,
          address,
          product,
          quantity,
          purpose,
          deliveryOption: deliveryOption || undefined,
          message: message || "No message provided",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setResponseMsg(data.message || "Thank you! Your wholesale inquiry has been submitted. We will get back to you shortly.");
        setFormData({
          fullName: "",
          businessName: "",
          email: "",
          phoneCode: "+234",
          phone: "",
          address: "",
          product: "",
          quantity: "",
          purpose: "",
          deliveryOption: "",
          message: "",
        });
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Failed to submit inquiry. Please check the fields and try again.");
      }
    } catch (err) {
      setStatus("error");
      setResponseMsg("An error occurred. Please check your connection and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-[#f8f3ef] p-5 sm:p-8 lg:p-10 border border-[#e2d5c5]" id="wholesale-inquiry-form">
      {responseMsg && (
        <div
          className={`p-4 mb-6 text-sm font-sans font-medium ${
            status === "success"
              ? "bg-[#1B4D3E]/10 text-brand-green border-l-4 border-brand-green"
              : "bg-red-50 text-red-700 border-l-4 border-red-500"
          }`}
        >
          {responseMsg}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label htmlFor="wholesale-full-name" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
            Full Name <RequiredMark />
          </label>
          <input
            id="wholesale-full-name"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            disabled={status === "loading"}
            className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green placeholder:text-brand-green/70 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
          />
        </div>

        <div>
          <label htmlFor="wholesale-business-name" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
            Business Name <RequiredMark />
          </label>
          <input
            id="wholesale-business-name"
            name="businessName"
            type="text"
            required
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter your business name"
            disabled={status === "loading"}
            className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green placeholder:text-brand-green/70 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
          />
        </div>

        <div>
          <label htmlFor="wholesale-email" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
            Email Address <RequiredMark />
          </label>
          <input
            id="wholesale-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            disabled={status === "loading"}
            className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green placeholder:text-brand-green/70 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
          />
        </div>

        <div>
          <label htmlFor="wholesale-phone" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
            Phone/ Whatsapp no <RequiredMark />
          </label>
          <div className="grid grid-cols-[92px_1fr] gap-1.5">
            <select
              id="wholesale-phone-code"
              name="phoneCode"
              aria-label="Country code"
              value={formData.phoneCode}
              onChange={handleChange}
              disabled={status === "loading"}
              className="h-14 border border-[#c5b9a8] bg-white px-2.5 font-google-sans text-base text-brand-green focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
            >
              <option value="+234">+234</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+233">+233</option>
            </select>
            <input
              id="wholesale-phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="80..."
              disabled={status === "loading"}
              className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green placeholder:text-brand-green/70 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="wholesale-address" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
          Location / Delivery Address <RequiredMark />
        </label>
        <input
          id="wholesale-address"
          name="address"
          type="text"
          required
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter delivery address"
          disabled={status === "loading"}
          className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green placeholder:text-brand-green/70 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label htmlFor="wholesale-product" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
            Product Interested In <RequiredMark />
          </label>
          <select
            id="wholesale-product"
            name="product"
            required
            value={formData.product}
            onChange={handleChange}
            disabled={status === "loading"}
            className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="" disabled>Select a product</option>
            <option value="200g-whipped">200g Whipped</option>
            <option value="1kg-pouch">1kg Pouch</option>
            <option value="15kg-bucket">15kg Bucket</option>
            <option value="mixed-order">Mixed Order</option>
          </select>
        </div>

        <div>
          <label htmlFor="wholesale-quantity" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
            Required Quantity <RequiredMark />
          </label>
          <input
            id="wholesale-quantity"
            name="quantity"
            type="text"
            required
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 50 Jars / 10 Pouches"
            disabled={status === "loading"}
            className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green placeholder:text-brand-green/70 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
          />
        </div>

        <div>
          <label htmlFor="wholesale-purpose" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
            Purpose of purchase <RequiredMark />
          </label>
          <select
            id="wholesale-purpose"
            name="purpose"
            required
            value={formData.purpose}
            onChange={handleChange}
            disabled={status === "loading"}
            className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="" disabled>Select Purpose</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="personal-business">Personal Business</option>
            <option value="distribution">Distribution</option>
          </select>
        </div>

        <div>
          <label htmlFor="wholesale-delivery" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
            Preferred Delivery Option
          </label>
          <select
            id="wholesale-delivery"
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
            disabled={status === "loading"}
            className="h-14 w-full border border-[#c5b9a8] bg-white px-4 font-google-sans text-base text-brand-green focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="">Select Delivery Option</option>
            <option value="pickup">Pickup</option>
            <option value="local-delivery">Local Delivery</option>
            <option value="interstate">Interstate Delivery</option>
            <option value="international">International Shipping</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="wholesale-message" className="mb-2 block font-google-sans text-lg font-bold text-brand-green">
          Message / Special Request
        </label>
        <textarea
          id="wholesale-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your requirements"
          disabled={status === "loading"}
          className="w-full border border-[#c5b9a8] bg-white px-4 py-4 font-google-sans text-base text-brand-green placeholder:text-brand-green/70 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 flex h-16 w-full items-center justify-center bg-[#1B4D3E] px-6 font-google-sans text-lg font-bold text-white transition-colors hover:bg-[#153D31] disabled:bg-[#a6bca6] disabled:cursor-not-allowed uppercase tracking-wider"
        id="wholesale-submit-btn"
      >
        {status === "loading" ? "Submitting Request..." : "Submit Inquiry"}
      </button>
    </form>
  );
}

export default function WholesaleFormClient() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-brand-green font-serif">Loading quote request form...</div>}>
      <WholesaleFormInner />
    </Suspense>
  );
}
