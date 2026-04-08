"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { funcionarioSchema, type FuncionarioFormValues } from "./schema";

type FuncionarioSubmit = (values: FuncionarioFormValues) => Promise<{ ok: boolean; message: string }>;

export default function FuncionarioForm({
  defaultValues,
  onSubmit,
}: Readonly<{
  defaultValues?: Partial<FuncionarioFormValues>;
  onSubmit: FuncionarioSubmit;
}>) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const form = useForm<FuncionarioFormValues>({
    resolver: zodResolver(funcionarioSchema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      cpf: defaultValues?.cpf ?? "",
      telefone: defaultValues?.telefone ?? "",
      endereco: defaultValues?.endereco ?? "",
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

      <div>
        <label htmlFor="cpf" className="mb-1 block text-sm font-medium">CPF</label>
        <input id="cpf" {...form.register("cpf")} className="w-full rounded-md border px-3 py-2" />
        <p className="mt-1 text-xs text-destructive">{form.formState.errors.cpf?.message}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="telefone" className="mb-1 block text-sm font-medium">Telefone</label>
          <input id="telefone" {...form.register("telefone")} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label htmlFor="endereco" className="mb-1 block text-sm font-medium">Endereco</label>
          <input id="endereco" {...form.register("endereco")} className="w-full rounded-md border px-3 py-2" />
        </div>
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
