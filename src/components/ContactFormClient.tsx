"use client";

import React, { useState } from "react";

export default function ContactFormClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      setStatus("error");
      setResponseMsg("Please fill in all required fields (Name, Email, Phone, and Message).");
      return;
    }

    setStatus("loading");
    setResponseMsg("");

    try {
      const response = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setResponseMsg(data.message || "Thank you! Your message has been received.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setResponseMsg("An error occurred. Please check your connection and try again.");
    }
  };

  return (
    <div className="bg-[#f3ece4] border border-[#e2d5c5] p-6 sm:p-10 shadow-sm">
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-green mb-6 pb-2 border-b border-[#e2d5c5]">
        Send a Message
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
        {responseMsg && (
          <div
            className={`p-4 text-sm font-sans font-medium ${
              status === "success"
                ? "bg-[#1B4D3E]/10 text-brand-green border-l-4 border-brand-green"
                : "bg-red-50 text-red-700 border-l-4 border-red-500"
            }`}
          >
            {responseMsg}
          </div>
        )}

        <div>
          <label htmlFor="contact-input-name" className="block text-xs font-google-sans font-bold text-brand-green uppercase tracking-wider mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            id="contact-input-name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={status === "loading"}
            className="w-full border border-[#c5b9a8] bg-white px-4 py-3.5 font-google-sans text-sm text-brand-green placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all disabled:bg-[#eae0d5]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-input-email" className="block text-xs font-google-sans font-bold text-brand-green uppercase tracking-wider mb-2">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="contact-input-email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={status === "loading"}
              className="w-full border border-[#c5b9a8] bg-white px-4 py-3.5 font-google-sans text-sm text-brand-green placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all disabled:bg-[#eae0d5]"
            />
          </div>
          <div>
            <label htmlFor="contact-input-phone" className="block text-xs font-google-sans font-bold text-brand-green uppercase tracking-wider mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="contact-input-phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+234..."
              disabled={status === "loading"}
              className="w-full border border-[#c5b9a8] bg-white px-4 py-3.5 font-google-sans text-sm text-brand-green placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all disabled:bg-[#eae0d5]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-input-subject" className="block text-xs font-google-sans font-bold text-brand-green uppercase tracking-wider mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="contact-input-subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?"
            disabled={status === "loading"}
            className="w-full border border-[#c5b9a8] bg-white px-4 py-3.5 font-google-sans text-sm text-brand-green placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all disabled:bg-[#eae0d5]"
          />
        </div>

        <div>
          <label htmlFor="contact-input-message" className="block text-xs font-google-sans font-bold text-brand-green uppercase tracking-wider mb-2">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            id="contact-input-message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            rows={5}
            disabled={status === "loading"}
            className="w-full border border-[#c5b9a8] bg-white px-4 py-3.5 font-google-sans text-sm text-brand-green placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all disabled:bg-[#eae0d5] resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto bg-[#1B4D3E] text-white font-google-sans font-bold text-sm px-10 py-4 rounded-none hover:bg-[#153D31] transition-all duration-300 uppercase tracking-wider disabled:bg-[#a6bca6] disabled:cursor-not-allowed"
          id="contact-submit-btn"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
