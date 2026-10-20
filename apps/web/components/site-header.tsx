import Link from "next/link";

import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-home" href="/" aria-label="Nabilla Zachra, home">
        <BrandMark className="brand-home-mark" decorative />
        <span className="brand-home-copy">
          <strong>Nabilla Zachra</strong>
          <small>NZ / Identity System</small>
        </span>
      </Link>
      <p className="header-role">Technical Consultant × Product Designer</p>
      <nav aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
