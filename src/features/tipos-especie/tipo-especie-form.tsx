"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { tipoEspecieSchema, type TipoEspecieFormValues } from "./schema";

type TipoEspecieSubmit = (values: TipoEspecieFormValues) => Promise<{ ok: boolean; message: string }>;

export default function TipoEspecieForm({
  defaultValues,
  onSubmit,
}: Readonly<{
  defaultValues?: Partial<TipoEspecieFormValues>;
  onSubmit: TipoEspecieSubmit;
}>) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const form = useForm<TipoEspecieFormValues>({
    resolver: zodResolver(tipoEspecieSchema),
    defaultValues: {
      especie: defaultValues?.especie ?? "",
      raca: defaultValues?.raca ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = await onSubmit(values);
    setServerMessage(result.message);

    if (result.ok) {
      router.back();
      router.refresh();
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="especie" className="mb-1 block text-sm font-medium">Especie</label>
        <input id="especie" {...form.register("especie")} className="w-full rounded-md border px-3 py-2" />
        <p className="mt-1 text-xs text-destructive">{form.formState.errors.especie?.message}</p>
      </div>
      <div>
        <label htmlFor="raca" className="mb-1 block text-sm font-medium">Raca</label>
        <input id="raca" {...form.register("raca")} className="w-full rounded-md border px-3 py-2" />
        <p className="mt-1 text-xs text-destructive">{form.formState.errors.raca?.message}</p>
      </div>

      {serverMessage ? <p className="text-sm">{serverMessage}</p> : null}

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
