import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <section className="w-full max-w-md rounded-2xl border border-red-600/25 bg-red-50 p-6 dark:bg-red-950/20">
        <h1 className="text-2xl font-semibold">Login failed</h1>
        <p className="mt-2 text-sm opacity-90">
          We could not complete the Google login flow. Please try again.
        </p>
        <Link
          href="/auth/login"
          className="mt-6 inline-flex rounded-lg bg-black px-4 py-2 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          Back to login
        </Link>
      </section>
    </main>
  );
}