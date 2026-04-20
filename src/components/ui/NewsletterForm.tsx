'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  if (subscribed) {
    return (
      <p className="text-white text-sm tracking-wide">
        ✓ You&apos;re subscribed!
      </p>
    );
  }

  return (
    <form className="flex w-full max-w-md" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-5 py-3 text-sm text-white outline-none transition-colors"
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRight: 0,
          color: '#ffffff',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#ffffff';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        }}
      />
      <button
        type="submit"
        className="whitespace-nowrap font-semibold transition-colors"
        style={{
          background: '#ffffff',
          color: '#004BFA',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontSize: '0.75rem',
          padding: '0.75rem 1.5rem',
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
