import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-primary font-headline"
        >
          SOLANA FORGE
        </Link>
        <a
          href="#enroll"
          className="kinetic-gradient text-on-primary-container px-6 py-2 font-bold active:scale-95 transition-all duration-150 rounded-sm"
        >
          Enroll Now
        </a>
      </div>
    </nav>
  );
}
