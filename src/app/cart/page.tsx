'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const recommended = products.filter(
    (p) => !items.some((i) => i.product.id === p.id)
  ).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#020203]">
        <div className="relative border-b border-[#1f1f1f] bg-[#050506] py-16">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a55a]/10 to-transparent" />
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-[-0.01em] font-[Cormorant]">Your Cart</h1>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-28 text-center">
          <svg
            width="56"
            height="56"
            className="text-[#1f1f1f] mx-auto mb-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <h2 className="text-white text-3xl font-light tracking-[-0.01em] mb-3 font-[Cormorant]">
            Your cart is empty
          </h2>
          <p className="text-[#4a4a4a] text-[12px] tracking-wide mb-12 font-[Montserrat] font-light">
            Discover our exclusive collections and add something special.
          </p>
          <Link
            href="/products"
            className="inline-block btn-luxury bg-[#c8a55a] hover:bg-[#dfc07a] text-[#020203] text-[10px] tracking-[0.25em] uppercase font-semibold px-11 py-4.5 transition-colors duration-300 font-[Montserrat]"
          >
            Continue Shopping
          </Link>

          {recommended.length > 0 && (
            <div className="mt-28 text-left">
              <div className="section-divider mb-16" />
              <h3 className="text-white text-3xl font-light tracking-[-0.01em] mb-10 font-[Cormorant]">
                You Might Like
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
                {recommended.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const shipping = total >= 150 ? 0 : 9.99;
  const orderTotal = total + shipping;

  return (
    <div className="min-h-screen bg-[#020203]">
      <div className="relative border-b border-[#1f1f1f] bg-[#050506] py-16">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a55a]/10 to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-white text-4xl md:text-5xl font-light tracking-[-0.01em] font-[Cormorant]">
            Your Cart
          </h1>
          <p className="text-[#4a4a4a] text-[12px] tracking-[0.08em] mt-3 font-[Montserrat] font-light">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-0">
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 pb-5 border-b border-[#1f1f1f]/60 text-[10px] text-[#4a4a4a] tracking-[0.2em] uppercase font-[Montserrat]">
              <span>Product</span>
              <span className="w-24 text-center">Price</span>
              <span className="w-28 text-center">Quantity</span>
              <span className="w-20 text-right">Total</span>
            </div>

            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant}`}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-4 md:gap-6 py-8 border-b border-[#1f1f1f]/40 items-center"
              >
                <div className="flex items-center gap-5">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative w-20 h-20 shrink-0 overflow-hidden bg-[#0a0a0a]"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div>
                    <p className="text-[9px] text-[#4a4a4a] tracking-[0.18em] uppercase mb-1 font-[Montserrat]">
                      {item.product.vendor}
                    </p>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-[#e0e0e0] text-[13px] tracking-wide hover:text-[#c8a55a] transition-colors duration-200 font-[Montserrat] font-light"
                    >
                      {item.product.name}
                    </Link>
                    {item.variant && (
                      <p className="text-[#4a4a4a] text-[11px] tracking-wide mt-0.5 font-[Montserrat] font-light">
                        {item.variant}
                      </p>
                    )}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-[9px] text-[#4a4a4a] hover:text-[#c8a55a] tracking-[0.15em] uppercase transition-colors duration-200 mt-2 block cursor-pointer font-[Montserrat]"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="w-24 text-center">
                  <span className="text-[#8a8a8a] text-[13px] tracking-wide font-[Montserrat] font-light">
                    {formatPrice(item.product.price, item.product.currency)}
                  </span>
                </div>

                <div className="w-28 flex items-center justify-center">
                  <div className="flex items-center border border-[#1f1f1f]">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-[#6b6b6b] hover:text-white hover:bg-[#0f0f0f] transition-colors duration-200 cursor-pointer"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="w-10 h-9 flex items-center justify-center text-white text-[12px] border-x border-[#1f1f1f] font-[Montserrat] font-light">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-[#6b6b6b] hover:text-white hover:bg-[#0f0f0f] transition-colors duration-200 cursor-pointer"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="w-20 text-right">
                  <span className="text-white text-[13px] font-medium tracking-wide font-[Montserrat]">
                    {formatPrice(item.product.price * item.quantity, item.product.currency)}
                  </span>
                </div>
              </div>
            ))}

            <div className="pt-7 flex justify-between items-center">
              <Link
                href="/products"
                className="text-[#6b6b6b] hover:text-white text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 flex items-center gap-2.5 font-[Montserrat] font-medium"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-[#4a4a4a] hover:text-[#8a8a8a] text-[10px] tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer font-[Montserrat]"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-8 sticky top-28">
              <h2 className="text-white text-[11px] tracking-[0.3em] uppercase font-medium mb-8 font-[Montserrat]">
                Order Summary
              </h2>

              <div className="space-y-4 mb-7">
                <div className="flex justify-between items-center">
                  <span className="text-[#6b6b6b] text-[12px] tracking-wide font-[Montserrat] font-light">Subtotal</span>
                  <span className="text-white text-[13px] tracking-wide font-[Montserrat] font-light">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6b6b6b] text-[12px] tracking-wide font-[Montserrat] font-light">Shipping</span>
                  <span className={`text-[13px] tracking-wide font-[Montserrat] font-light ${shipping === 0 ? 'text-[#c8a55a]' : 'text-white'}`}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {total < 150 && (
                  <p className="text-[#4a4a4a] text-[11px] tracking-wide font-[Montserrat] font-light">
                    Add {formatPrice(150 - total)} more for free shipping
                  </p>
                )}
              </div>

              {/* Promo code */}
              <div className="mb-7">
                <div className="flex gap-0">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-[#0a0a0a] border border-[#1f1f1f] border-r-0 px-4 py-3 text-[12px] text-white placeholder:text-[#3a3a3a] outline-none focus:border-[#c8a55a]/50 transition-colors duration-300 font-[Montserrat] font-light"
                  />
                  <button className="bg-[#141414] hover:bg-[#1f1f1f] border border-[#1f1f1f] text-[#8a8a8a] hover:text-white text-[10px] tracking-[0.18em] uppercase px-5 transition-colors duration-200 cursor-pointer font-[Montserrat]">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t border-[#1f1f1f]/60 pt-7 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white text-[11px] tracking-[0.15em] uppercase font-medium font-[Montserrat]">
                    Total
                  </span>
                  <span className="text-white text-xl font-light tracking-wide font-[Cormorant]">
                    {formatPrice(orderTotal)}
                  </span>
                </div>
                <p className="text-[#4a4a4a] text-[10px] tracking-wide mt-1.5 text-right font-[Montserrat] font-light">
                  Including taxes
                </p>
              </div>

              <button className="w-full btn-luxury bg-[#c8a55a] hover:bg-[#dfc07a] text-[#020203] text-[10px] tracking-[0.25em] uppercase font-semibold py-4.5 transition-colors duration-300 cursor-pointer font-[Montserrat]">
                Proceed to Checkout
              </button>

              {/* Payment icons */}
              <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
                {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY'].map((m) => (
                  <span
                    key={m}
                    className="text-[8px] text-[#4a4a4a] border border-[#1f1f1f] px-2 py-0.5 rounded-sm tracking-[0.1em] font-[Montserrat]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
