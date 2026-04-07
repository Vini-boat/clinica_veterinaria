"use client";

import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const nextParam = searchParams.get("next") ?? "/";
    const safeNext = nextParam.startsWith("/") ? nextParam : "/";
    const origin = window.location.origin;
    const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}`;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      setErrorMessage("Could not start Google login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center px-6">
      <section className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black/20">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm opacity-80">Use your Google account to continue.</p>

        <button
          type="button"
          onClick={onLogin}
          disabled={isLoading}
          className="mt-6 w-full rounded-lg bg-black px-4 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black"
        >
          {isLoading ? "Redirecting..." : "Login With Google"}
        </button>

        {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen grid place-items-center px-6">
          <section className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black/20">
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="mt-2 text-sm opacity-80">Loading...</p>
          </section>
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}