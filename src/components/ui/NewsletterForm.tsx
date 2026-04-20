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
      <p className="text-[#c8a55a] text-[12px] tracking-wide font-[Montserrat] font-light">
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
        className="flex-1 bg-[#0a0a0a] border border-[#1f1f1f] border-r-0 px-5 py-3.5 text-[12px] text-white outline-none placeholder:text-[#3a3a3a] focus:border-[#c8a55a]/50 transition-colors duration-300 font-[Montserrat] font-light tracking-wide"
      />
      <button
        type="submit"
        className="bg-[#c8a55a] hover:bg-[#dfc07a] text-[#020203] text-[10px] tracking-[0.2em] uppercase font-semibold px-7 py-3.5 transition-colors duration-300 whitespace-nowrap cursor-pointer font-[Montserrat]"
      >
        Subscribe
      </button>
    </form>
  );
}
