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
      <div className="min-h-screen">
        <div className="border-b border-[#1a1a1a] bg-[#0d0d0d] py-14">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <h1 className="text-white text-4xl font-light tracking-tight">Your Cart</h1>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24 text-center">
          <svg
            width="64"
            height="64"
            className="text-[#333] mx-auto mb-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <h2 className="text-white text-2xl font-light tracking-wide mb-3">
            Your cart is empty
          </h2>
          <p className="text-[#555] text-sm tracking-wide mb-10">
            Discover our exclusive collections and add something special.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#c9a84c] hover:bg-[#e2c97e] text-black text-[11px] tracking-[0.2em] uppercase font-bold px-10 py-4 transition-colors"
          >
            Continue Shopping
          </Link>

          {recommended.length > 0 && (
            <div className="mt-24 text-left">
              <h3 className="text-white text-xl tracking-[0.08em] uppercase font-light mb-8">
                You Might Like
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
    <div className="min-h-screen">
      <div className="border-b border-[#1a1a1a] bg-[#0d0d0d] py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h1 className="text-white text-4xl font-light tracking-tight">
            Your Cart
          </h1>
          <p className="text-[#555] text-sm tracking-wide mt-2">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-0">
            {/* Header */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 pb-4 border-b border-[#1a1a1a] text-[11px] text-[#555] tracking-[0.15em] uppercase">
              <span>Product</span>
              <span className="w-24 text-center">Price</span>
              <span className="w-28 text-center">Quantity</span>
              <span className="w-20 text-right">Total</span>
            </div>

            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant}`}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-4 md:gap-6 py-8 border-b border-[#1a1a1a] items-center"
              >
                {/* Product */}
                <div className="flex items-center gap-5">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative w-20 h-20 shrink-0 overflow-hidden bg-[#111]"
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
                    <p className="text-[10px] text-[#666] tracking-[0.15em] uppercase mb-0.5">
                      {item.product.vendor}
                    </p>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-white text-sm tracking-wide hover:text-[#c9a84c] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    {item.variant && (
                      <p className="text-[#555] text-xs tracking-wide mt-0.5">
                        {item.variant}
                      </p>
                    )}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-[10px] text-[#555] hover:text-[#c9a84c] tracking-[0.1em] uppercase transition-colors mt-2 block"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="w-24 text-center">
                  <span className="text-[#a0a0a0] text-sm tracking-wide">
                    {formatPrice(item.product.price, item.product.currency)}
                  </span>
                </div>

                {/* Quantity */}
                <div className="w-28 flex items-center justify-center">
                  <div className="flex items-center border border-[#2a2a2a]">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-[#a0a0a0] hover:text-white hover:bg-[#161616] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="w-10 h-9 flex items-center justify-center text-white text-sm border-x border-[#2a2a2a]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-[#a0a0a0] hover:text-white hover:bg-[#161616] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="w-20 text-right">
                  <span className="text-white text-sm font-medium tracking-wide">
                    {formatPrice(item.product.price * item.quantity, item.product.currency)}
                  </span>
                </div>
              </div>
            ))}

            <div className="pt-6 flex justify-between items-center">
              <Link
                href="/products"
                className="text-[#a0a0a0] hover:text-white text-[11px] tracking-[0.2em] uppercase transition-colors flex items-center gap-2"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-[#555] hover:text-[#a0a0a0] text-[11px] tracking-[0.15em] uppercase transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-8 sticky top-28">
              <h2 className="text-white text-[12px] tracking-[0.25em] uppercase font-semibold mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#666] text-sm tracking-wide">Subtotal</span>
                  <span className="text-white text-sm tracking-wide">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#666] text-sm tracking-wide">Shipping</span>
                  <span className={`text-sm tracking-wide ${shipping === 0 ? 'text-[#c9a84c]' : 'text-white'}`}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {total < 150 && (
                  <p className="text-[#555] text-xs tracking-wide">
                    Add {formatPrice(150 - total)} more for free shipping
                  </p>
                )}
              </div>

              {/* Promo code */}
              <div className="mb-6">
                <div className="flex gap-0">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-[#111] border border-[#2a2a2a] border-r-0 px-4 py-3 text-sm text-white placeholder:text-[#444] outline-none focus:border-[#c9a84c] transition-colors"
                  />
                  <button className="bg-[#222] hover:bg-[#333] border border-[#2a2a2a] text-[#a0a0a0] hover:text-white text-xs tracking-[0.15em] uppercase px-4 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t border-[#1a1a1a] pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm tracking-[0.1em] uppercase font-medium">
                    Total
                  </span>
                  <span className="text-white text-xl font-medium tracking-wide">
                    {formatPrice(orderTotal)}
                  </span>
                </div>
                <p className="text-[#555] text-xs tracking-wide mt-1 text-right">
                  Including taxes
                </p>
              </div>

              <button className="w-full bg-[#c9a84c] hover:bg-[#e2c97e] text-black text-[11px] tracking-[0.2em] uppercase font-bold py-4 transition-colors">
                Proceed to Checkout
              </button>

              {/* Payment icons */}
              <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
                {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY'].map((m) => (
                  <span
                    key={m}
                    className="text-[9px] text-[#444] border border-[#1e1e1e] px-1.5 py-0.5 rounded tracking-wider"
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
