import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center bg-[#020203] relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c8a55a]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <p className="text-[#c8a55a] text-[10px] tracking-[0.4em] uppercase mb-5 font-[Montserrat] font-medium relative">404</p>
      <h1 className="text-white text-5xl md:text-6xl font-light tracking-[-0.01em] mb-5 font-[Cormorant] relative">
        Page Not Found
      </h1>
      <p className="text-[#4a4a4a] text-[12px] tracking-wide max-w-sm mb-12 font-[Montserrat] font-light relative">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn-luxury bg-[#c8a55a] hover:bg-[#dfc07a] text-[#020203] text-[10px] tracking-[0.25em] uppercase font-semibold px-11 py-4.5 transition-colors duration-300 font-[Montserrat] relative"
      >
        Return Home
      </Link>
    </div>
  );
}
