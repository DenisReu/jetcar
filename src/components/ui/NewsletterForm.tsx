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
      <p className="text-[#c9a84c] text-sm tracking-wide">
        ✓ You&apos;re subscribed! Check your inbox for your 10% discount code.
      </p>
    );
  }

  return (
    <form className="flex gap-0 w-full max-w-md" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 bg-[#161616] border border-[#2a2a2a] border-r-0 px-5 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#c9a84c] transition-colors rounded-l-sm"
      />
      <button
        type="submit"
        className="bg-[#c9a84c] hover:bg-[#e2c97e] text-black text-xs tracking-[0.18em] uppercase font-bold px-6 py-3 transition-colors rounded-r-sm whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
