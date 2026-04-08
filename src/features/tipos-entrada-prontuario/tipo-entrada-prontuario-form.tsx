"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { tipoEntradaProntuarioSchema, type TipoEntradaProntuarioFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TipoEntradaSubmit = (values: TipoEntradaProntuarioFormValues) => Promise<{ ok: boolean; message: string }>;

export default function TipoEntradaProntuarioForm({
  defaultValues,
  onSubmit,
}: Readonly<{
  defaultValues?: Partial<TipoEntradaProntuarioFormValues>;
  onSubmit: TipoEntradaSubmit;
}>) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const form = useForm<TipoEntradaProntuarioFormValues>({
    resolver: zodResolver(tipoEntradaProntuarioSchema),
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" {...form.register("nome")} aria-invalid={!!form.formState.errors.nome} />
        <p className="text-xs text-destructive">{form.formState.errors.nome?.message}</p>
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
