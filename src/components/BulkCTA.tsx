import React from "react";
import Link from "next/link";

export default function BulkCTA() {
  return (
    <section className="section-padding bg-brand-green text-white relative overflow-hidden" id="bulk-cta-section">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-white rounded-full blur-[80px]" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-brand-gold rounded-full blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left info */}
          <div className="space-y-6">
            <span className="text-brand-gold font-sans font-semibold text-xs tracking-widest uppercase block">
              Wholesale & Bulk Orders
            </span>
            <h2 className="heading-lg text-white font-bold leading-tight">
              Premium Raw Shea Butter in Bulk Quantities
            </h2>
            <p className="text-white/80 font-sans text-base md:text-lg leading-relaxed max-w-xl">
              We supply cosmetic manufacturers, soap makers, packagers, and wholesale distributors worldwide. Directly imported from Nigerian cooperatives to guarantee fresh, unadulterated premium quality.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#bulk-inquiry-section"
                className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-sans font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-gold/25 hover:scale-[1.02]"
                id="bulk-request-quote-btn"
              >
                Request Bulk Quote
              </Link>
              <Link
                href="/contact"
                className="border border-white/30 hover:border-white text-white hover:bg-white/10 font-sans font-medium text-sm px-8 py-4 rounded-full transition-all duration-300"
                id="bulk-contact-btn"
              >
                Talk to Sales
              </Link>
            </div>
          </div>

          {/* Right features/metrics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-2">
              <span className="text-3xl md:text-4xl font-bold font-sans text-brand-gold block">
                25+ Tons
              </span>
              <span className="text-sm font-sans text-white/70 block">
                Monthly production capacity
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-2">
              <span className="text-3xl md:text-4xl font-bold font-sans text-brand-gold block">
                100%
              </span>
              <span className="text-sm font-sans text-white/70 block">
                Traceable origin
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-2">
              <span className="text-3xl md:text-4xl font-bold font-sans text-brand-gold block">
                Custom
              </span>
              <span className="text-sm font-sans text-white/70 block">
                Packaging & sizing options
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-2">
              <span className="text-3xl md:text-4xl font-bold font-sans text-brand-gold block">
                Global
              </span>
              <span className="text-sm font-sans text-white/70 block">
                Shipping & distribution
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
