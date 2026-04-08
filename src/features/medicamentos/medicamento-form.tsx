"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { medicamentoSchema, type MedicamentoFormValues } from "./schema";

type MedicamentoSubmit = (values: MedicamentoFormValues) => Promise<{ ok: boolean; message: string }>;

export default function MedicamentoForm({
  defaultValues,
  onSubmit,
}: Readonly<{
  defaultValues?: Partial<MedicamentoFormValues>;
  onSubmit: MedicamentoSubmit;
}>) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const form = useForm<MedicamentoFormValues>({
    resolver: zodResolver(medicamentoSchema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
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
        <label htmlFor="nome" className="mb-1 block text-sm font-medium">Nome</label>
        <input id="nome" {...form.register("nome")} className="w-full rounded-md border px-3 py-2" />
        <p className="mt-1 text-xs text-destructive">{form.formState.errors.nome?.message}</p>
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
