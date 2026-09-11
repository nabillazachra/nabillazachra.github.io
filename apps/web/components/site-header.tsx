import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Nabilla Zachra, home">
        <span>Nabilla</span>
        <span>Zachra</span>
      </Link>
      <p className="header-role">Product &amp; Experience Designer</p>
      <nav aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
