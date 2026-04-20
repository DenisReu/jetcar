import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase mb-4">404</p>
      <h1 className="text-white text-5xl font-light tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-[#555] text-sm tracking-wide max-w-sm mb-10">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#c9a84c] hover:bg-[#e2c97e] text-black text-[11px] tracking-[0.2em] uppercase font-bold px-10 py-4 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
