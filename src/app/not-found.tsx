import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        This channel <span className="text-gradient">does not exist</span>
      </h1>
      <p className="mt-4 max-w-md text-muted">The page you are looking for was moved, deleted or never created.</p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </main>
  );
}
