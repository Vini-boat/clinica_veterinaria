"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { animalSchema, type AnimalFormValues } from "./schema";
import { toNullableNumber } from "@/features/shared/utils/form-utils";

type AnimalSubmit = (values: AnimalFormValues) => Promise<{ ok: boolean; message: string }>;

type AnimalLookup = {
  clientes: Array<{ id_cliente: number; nome: string | null }>;
  tiposEspecie: Array<{ id_tipo_especie: number; especie: string | null; raca: string | null }>;
};

export default function AnimalForm({
  defaultValues,
  lookup,
  onSubmit,
}: Readonly<{
  defaultValues?: Partial<AnimalFormValues>;
  lookup: AnimalLookup;
  onSubmit: AnimalSubmit;
}>) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const form = useForm<AnimalFormValues>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      id_cliente: defaultValues?.id_cliente,
      id_tipo_especie: defaultValues?.id_tipo_especie,
      sexo: defaultValues?.sexo ?? null,
      porte: defaultValues?.porte ?? null,
      idade: defaultValues?.idade ?? null,
      peso_gramas: defaultValues?.peso_gramas ?? null,
      observacao: defaultValues?.observacao ?? "",
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="id_cliente" className="mb-1 block text-sm font-medium">Cliente dono</label>
          <select
            id="id_cliente"
            className="w-full rounded-md border px-3 py-2"
            value={form.watch("id_cliente") ?? ""}
            onChange={(event) => form.setValue("id_cliente", Number(event.target.value), { shouldValidate: true })}
          >
            <option value="">Selecione...</option>
            {lookup.clientes.map((cliente) => (
              <option key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.nome ?? `Cliente ${cliente.id_cliente}`}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-destructive">{form.formState.errors.id_cliente?.message}</p>
        </div>

        <div>
          <label htmlFor="id_tipo_especie" className="mb-1 block text-sm font-medium">Especie e raca</label>
          <select
            id="id_tipo_especie"
            className="w-full rounded-md border px-3 py-2"
            value={form.watch("id_tipo_especie") ?? ""}
            onChange={(event) => form.setValue("id_tipo_especie", Number(event.target.value), { shouldValidate: true })}
          >
            <option value="">Selecione...</option>
            {lookup.tiposEspecie.map((tipo) => (
              <option key={tipo.id_tipo_especie} value={tipo.id_tipo_especie}>
                {(tipo.especie ?? "Especie") + " - " + (tipo.raca ?? "Raca")}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-destructive">{form.formState.errors.id_tipo_especie?.message}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="sexo" className="mb-1 block text-sm font-medium">Sexo</label>
          <select
            id="sexo"
            className="w-full rounded-md border px-3 py-2"
            value={form.watch("sexo") ?? ""}
            onChange={(event) => form.setValue("sexo", event.target.value ? (event.target.value as "Macho" | "Femea") : null)}
          >
            <option value="">Nao informado</option>
            <option value="Macho">Macho</option>
            <option value="Femea">Femea</option>
          </select>
        </div>

        <div>
          <label htmlFor="porte" className="mb-1 block text-sm font-medium">Porte</label>
          <select
            id="porte"
            className="w-full rounded-md border px-3 py-2"
            value={form.watch("porte") ?? ""}
            onChange={(event) =>
              form.setValue("porte", event.target.value ? (event.target.value as "Pequeno" | "Medio" | "Grande") : null)
            }
          >
            <option value="">Nao informado</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Medio">Medio</option>
            <option value="Grande">Grande</option>
          </select>
        </div>

        <div>
          <label htmlFor="idade" className="mb-1 block text-sm font-medium">Idade (anos)</label>
          <input
            id="idade"
            type="number"
            className="w-full rounded-md border px-3 py-2"
            value={form.watch("idade") ?? ""}
            onChange={(event) => form.setValue("idade", toNullableNumber(event.target.value), { shouldValidate: true })}
          />
        </div>

        <div>
          <label htmlFor="peso_gramas" className="mb-1 block text-sm font-medium">Peso (g)</label>
          <input
            id="peso_gramas"
            type="number"
            className="w-full rounded-md border px-3 py-2"
            value={form.watch("peso_gramas") ?? ""}
            onChange={(event) => form.setValue("peso_gramas", toNullableNumber(event.target.value), { shouldValidate: true })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="observacao" className="mb-1 block text-sm font-medium">Observacao</label>
        <textarea id="observacao" {...form.register("observacao")} className="min-h-20 w-full rounded-md border px-3 py-2" />
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
