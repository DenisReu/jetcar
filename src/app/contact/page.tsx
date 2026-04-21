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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    fontSize: '14px',
    padding: '0.875rem 1.25rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

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
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Response Time',
      value: 'Within 24 business hours',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Registered',
      value: 'Transparent Global Limited, UK',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#000000' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.5rem,5vw,5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: '0.75rem',
            }}
          >
            CONTACT US
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', letterSpacing: '0.05em' }}>
            Our team is here to help with any questions about your order or products.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: 'clamp(2.5rem,5vw,5rem) clamp(1.5rem,5vw,4rem)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '4rem' }}>
          {/* Info */}
          <div>
            <h2
              style={{
                color: '#ffffff',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '2.5rem',
              }}
            >
              CUSTOMER SUPPORT
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {contactInfo.map((info) => (
                <div key={info.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ color: '#004BFA', flexShrink: 0, marginTop: '2px' }}>{info.icon}</div>
                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      {info.label}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '1.5rem',
              }}
            >
              <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, marginBottom: '0.5rem' }}>
                Looking for quick answers?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginBottom: '1rem' }}>
                Check our FAQ for shipping, returns, and product information.
              </p>
              <a
                href="/faq"
                style={{
                  color: '#004BFA',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                VIEW FAQ
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5rem 1rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'rgba(0,75,250,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004BFA" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    color: '#ffffff',
                    fontSize: 'clamp(1.5rem,3vw,2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  MESSAGE SENT
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', maxWidth: '32ch', marginBottom: '2.5rem' }}>
                  Thank you for reaching out. We&apos;ll get back to you within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '', orderNumber: '' });
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#004BFA',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#004BFA')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#004BFA')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      SUBJECT *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#004BFA')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    >
                      <option value="" style={{ background: '#111' }}>Select a subject</option>
                      <option value="order" style={{ background: '#111' }}>Order Enquiry</option>
                      <option value="shipping" style={{ background: '#111' }}>Shipping & Delivery</option>
                      <option value="returns" style={{ background: '#111' }}>Returns & Refunds</option>
                      <option value="product" style={{ background: '#111' }}>Product Information</option>
                      <option value="other" style={{ background: '#111' }}>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      ORDER NUMBER
                    </label>
                    <input
                      type="text"
                      value={form.orderNumber}
                      onChange={(e) => setForm((f) => ({ ...f, orderNumber: e.target.value }))}
                      placeholder="#BUG-XXXXX"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#004BFA')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Please describe your enquiry in detail…"
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#004BFA')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                <div style={{ paddingTop: '0.5rem' }}>
                  <button
                    type="submit"
                    className="btn-bugatti btn-bugatti-white"
                    style={{ borderRadius: 0 }}
                  >
                    SEND MESSAGE
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
