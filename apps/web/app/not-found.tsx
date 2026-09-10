import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found shell" id="main-content">
      <p className="mono-label">404 / Not found</p>
      <h1>This page left the grid.</h1>
      <Link className="text-link" href="/">
        Return home ←
      </Link>
    </main>
  );
}
