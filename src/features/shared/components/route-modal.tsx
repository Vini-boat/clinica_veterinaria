"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RouteModal({
  title,
  description,
  children,
}: Readonly<{
  title: string;
  description?: string;
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl border bg-background shadow-xl">
        <div className="flex items-start justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md p-2 hover:bg-muted"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
