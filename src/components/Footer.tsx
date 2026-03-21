import Link from "next/link";

const footerLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Github" },
  { href: "#", label: "Twitter" },
  { href: "#", label: "Discord" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-surface-variant/10 bg-surface-container-lowest">
      <div className="w-full px-12 py-16 flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto">
        <div className="font-label text-xs uppercase tracking-widest text-on-surface/40 mb-8 md:mb-0">
          &copy; 2024 Solana Forge. Built for the high-performance mind.
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-label text-xs uppercase tracking-widest text-on-surface/40 hover:text-primary transition-opacity hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
