import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: '#000000',
      }}
    >
      <p
        style={{
          color: '#004BFA',
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}
      >
        404
      </p>
      <h1
        style={{
          color: '#ffffff',
          fontSize: 'clamp(2.5rem,6vw,5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: '1.5rem',
        }}
      >
        PAGE NOT FOUND
      </h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          maxWidth: '32ch',
          marginBottom: '3rem',
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn-bugatti btn-bugatti-white"
        style={{ borderRadius: 0 }}
      >
        RETURN HOME
      </Link>
    </div>
  );
}
