'use client';

import { useState, useEffect, useCallback } from 'react';

export const TOPBAR_HEIGHT = '3rem';

type Message = {
  text: string;
  href?: string;
};

const messages: Message[] = [
  { text: 'SUBSCRIBE TO NEWSLETTER FOR 10% OFF', href: '/pages/newsletter' },
  { text: 'UK/EU FREE DELIVERY OVER £150/€150' },
  { text: 'A QUESTION? VISIT OUR CONTACT PAGE', href: '/contact' },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const advance = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
      setVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 3000);
    return () => clearInterval(id);
  }, [advance]);

  const msg = messages[current];

  const inner = (
    <span
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        letterSpacing: '0.05em',
        color: msg.href ? '#004BFA' : '#fafafa',
        transition: 'opacity 0.5s',
        opacity: visible ? 1 : 0,
        textDecoration: msg.href ? 'underline' : 'none',
        cursor: msg.href ? 'pointer' : 'default',
      }}
    >
      {msg.text}
    </span>
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: TOPBAR_HEIGHT,
        backgroundColor: '#1f1f1f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="2xl:h-14"
    >
      {msg.href ? (
        <a href={msg.href}>{inner}</a>
      ) : (
        inner
      )}
    </div>
  );
}
