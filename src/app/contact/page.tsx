'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-[#111] border border-[#2a2a2a] focus:border-[#c9a84c] text-white text-sm px-5 py-3.5 outline-none placeholder:text-[#444] transition-colors';

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'support@bugatti.store',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Response Time',
      value: 'Within 24 business hours',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Registered',
      value: 'Transparent Global Limited, UK',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] bg-[#0d0d0d] py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase mb-2">
            Get in Touch
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-light tracking-tight">
            Contact Us
          </h1>
          <p className="text-[#666] text-sm tracking-wide mt-3">
            Our team is here to help with any questions about your order or our products.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-white text-[12px] tracking-[0.25em] uppercase font-semibold mb-8">
              Customer Support
            </h2>
            <div className="space-y-8 mb-12">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="text-[#c9a84c] shrink-0 mt-0.5">{info.icon}</div>
                  <div>
                    <p className="text-[11px] text-[#555] tracking-[0.15em] uppercase mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-[#a0a0a0] text-sm tracking-wide">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ link */}
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6">
              <h3 className="text-white text-sm font-medium tracking-wide mb-2">
                Looking for quick answers?
              </h3>
              <p className="text-[#555] text-xs tracking-wide mb-4">
                Check our FAQ for shipping, returns, and product information.
              </p>
              <a
                href="/faq"
                className="text-[#c9a84c] hover:text-[#e2c97e] text-[11px] tracking-[0.18em] uppercase font-medium transition-colors inline-flex items-center gap-2"
              >
                View FAQ
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mb-6">
                  <svg
                    width="28"
                    height="28"
                    className="text-[#c9a84c]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-white text-2xl font-light tracking-wide mb-3">
                  Message Sent
                </h3>
                <p className="text-[#666] text-sm tracking-wide max-w-sm">
                  Thank you for reaching out. We&apos;ll get back to you within 24 business
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '', orderNumber: '' });
                  }}
                  className="mt-8 text-[#c9a84c] hover:text-[#e2c97e] text-[11px] tracking-[0.2em] uppercase transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] text-[#555] tracking-[0.15em] uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#555] tracking-[0.15em] uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] text-[#555] tracking-[0.15em] uppercase mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className={inputClass + ' cursor-pointer'}
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Enquiry</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="product">Product Information</option>
                      <option value="wholesale">Wholesale Enquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#555] tracking-[0.15em] uppercase mb-2">
                      Order Number
                    </label>
                    <input
                      type="text"
                      value={form.orderNumber}
                      onChange={(e) => setForm((f) => ({ ...f, orderNumber: e.target.value }))}
                      placeholder="#BUG-XXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#555] tracking-[0.15em] uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Please describe your enquiry in detail…"
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#c9a84c] hover:bg-[#e2c97e] text-black text-[11px] tracking-[0.2em] uppercase font-bold px-12 py-4 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
