"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { tipoEspecieSchema, type TipoEspecieFormValues } from "./schema";
import type { ActionState } from "@/features/shared/utils/server-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TipoEspecieSubmit = (values: TipoEspecieFormValues) => Promise<{ ok: boolean; message: string }>;
type TipoEspecieDelete = () => Promise<ActionState>;

export default function TipoEspecieForm({
  defaultValues,
  onSubmit,
  onDelete,
}: Readonly<{
  defaultValues?: Partial<TipoEspecieFormValues>;
  onSubmit: TipoEspecieSubmit;
  onDelete?: TipoEspecieDelete;
}>) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    setIsDeleting(true);
    const result = await onDelete();
    setServerMessage(result.message);

    if (result.ok) {
      router.back();
      router.refresh();
    }

    setIsDeleting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="especie">Especie</Label>
        <Input id="especie" {...form.register("especie")} aria-invalid={!!form.formState.errors.especie} />
        <p className="text-xs text-destructive">{form.formState.errors.especie?.message}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="raca">Raca</Label>
        <Input id="raca" {...form.register("raca")} aria-invalid={!!form.formState.errors.raca} />
        <p className="text-xs text-destructive">{form.formState.errors.raca?.message}</p>
      </div>

      {serverMessage ? <p className="text-sm">{serverMessage}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={form.formState.isSubmitting || isDeleting}>
          {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
        {onDelete ? (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting || form.formState.isSubmitting}>
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
