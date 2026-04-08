"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { funcionarioSchema, type FuncionarioFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" {...form.register("nome")} aria-invalid={!!form.formState.errors.nome} />
        <p className="text-xs text-destructive">{form.formState.errors.nome?.message}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" {...form.register("cpf")} aria-invalid={!!form.formState.errors.cpf} />
        <p className="text-xs text-destructive">{form.formState.errors.cpf?.message}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" {...form.register("telefone")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="endereco">Endereco</Label>
          <Input id="endereco" {...form.register("endereco")} />
        </div>
      </div>

      {serverMessage ? <p className="text-sm">{serverMessage}</p> : null}

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
