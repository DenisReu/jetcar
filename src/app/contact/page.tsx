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
    'w-full bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#c8a55a]/50 text-white text-[12px] px-5 py-4 outline-none placeholder:text-[#3a3a3a] transition-colors duration-300 font-[Montserrat] font-light tracking-wide';

  const contactInfo = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'support@bugatti.store',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Response Time',
      value: 'Within 24 business hours',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Registered',
      value: 'Transparent Global Limited, UK',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020203]">
      {/* Header */}
      <div className="relative border-b border-[#1f1f1f] bg-[#050506] py-16">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a55a]/10 to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <p className="text-[#c8a55a] text-[10px] tracking-[0.35em] uppercase mb-3 font-[Montserrat] font-medium">
            Get in Touch
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.01em] font-[Cormorant]">
            Contact Us
          </h1>
          <p className="text-[#4a4a4a] text-[12px] tracking-[0.06em] mt-3 font-[Montserrat] font-light">
            Our team is here to help with any questions about your order or our products.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Info */}
          <div>
            <h2 className="text-[#8a8a8a] text-[10px] tracking-[0.3em] uppercase font-medium mb-10 font-[Montserrat]">
              Customer Support
            </h2>
            <div className="space-y-10 mb-14">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="text-[#c8a55a]/60 shrink-0 mt-0.5">{info.icon}</div>
                  <div>
                    <p className="text-[10px] text-[#4a4a4a] tracking-[0.2em] uppercase mb-1 font-[Montserrat]">
                      {info.label}
                    </p>
                    <p className="text-[#8a8a8a] text-[13px] tracking-wide font-[Montserrat] font-light">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ link */}
            <div className="glass-card p-7">
              <h3 className="text-white text-[14px] font-light tracking-wide mb-2 font-[Cormorant] text-lg">
                Looking for quick answers?
              </h3>
              <p className="text-[#4a4a4a] text-[11px] tracking-wide mb-5 font-[Montserrat] font-light">
                Check our FAQ for shipping, returns, and product information.
              </p>
              <a
                href="/faq"
                className="text-[#c8a55a] hover:text-[#dfc07a] text-[10px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 inline-flex items-center gap-2.5 font-[Montserrat]"
              >
                View FAQ
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full border border-[#c8a55a]/20 flex items-center justify-center mb-8">
                  <svg
                    width="26"
                    height="26"
                    className="text-[#c8a55a]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-white text-3xl font-light tracking-[-0.01em] mb-4 font-[Cormorant]">
                  Message Sent
                </h3>
                <p className="text-[#4a4a4a] text-[12px] tracking-wide max-w-sm font-[Montserrat] font-light">
                  Thank you for reaching out. We&apos;ll get back to you within 24 business
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '', orderNumber: '' });
                  }}
                  className="mt-10 text-[#c8a55a] hover:text-[#dfc07a] text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 cursor-pointer font-[Montserrat] font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-[#4a4a4a] tracking-[0.2em] uppercase mb-3 font-[Montserrat]">
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
                    <label className="block text-[10px] text-[#4a4a4a] tracking-[0.2em] uppercase mb-3 font-[Montserrat]">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-[#4a4a4a] tracking-[0.2em] uppercase mb-3 font-[Montserrat]">
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
                    <label className="block text-[10px] text-[#4a4a4a] tracking-[0.2em] uppercase mb-3 font-[Montserrat]">
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
                  <label className="block text-[10px] text-[#4a4a4a] tracking-[0.2em] uppercase mb-3 font-[Montserrat]">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Please describe your enquiry in detail..."
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="btn-luxury bg-[#c8a55a] hover:bg-[#dfc07a] text-[#020203] text-[10px] tracking-[0.25em] uppercase font-semibold px-12 py-4.5 transition-colors duration-300 cursor-pointer font-[Montserrat]"
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
