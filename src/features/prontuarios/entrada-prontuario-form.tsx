"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { selectedValuesAsNumbers } from "@/features/shared/utils/form-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { entradaProntuarioSchema, type EntradaProntuarioFormValues } from "./schema";

type EntradaSubmit = (values: EntradaProntuarioFormValues) => Promise<{ ok: boolean; message: string }>;

type EntradaLookup = {
  animais: Array<{ id_animal: number; nome: string | null; cliente_nome: string | null }>;
  tiposEntrada: Array<{ id_tipo_entrada_prontuario: number; nome: string | null }>;
  medicamentos: Array<{ id_medicamento: number; nome: string | null }>;
  funcionarios: Array<{ id_funcionario: number; nome: string | null }>;
};

export default function EntradaProntuarioForm({
  defaultAnimalId,
  lookup,
  onSubmit,
}: Readonly<{
  defaultAnimalId?: number;
  lookup: EntradaLookup;
  onSubmit: EntradaSubmit;
}>) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const form = useForm<EntradaProntuarioFormValues>({
    resolver: zodResolver(entradaProntuarioSchema),
    defaultValues: {
      id_animal: defaultAnimalId,
      id_tipo_entrada_prontuario: undefined,
      data_hora: new Date().toISOString().slice(0, 16),
      observacao: "",
      medicamentos: [],
      funcionarios: [],
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="id_animal" className="mb-1 block text-sm font-medium">Animal</label>
          <select
            id="id_animal"
            className="w-full rounded-md border px-3 py-2"
            value={form.watch("id_animal") ?? ""}
            onChange={(event) => form.setValue("id_animal", Number(event.target.value), { shouldValidate: true })}
          >
            <option value="">Selecione...</option>
            {lookup.animais.map((animal) => (
              <option key={animal.id_animal} value={animal.id_animal}>
                {(animal.nome ?? `Animal ${animal.id_animal}`) + " - " + (animal.cliente_nome ?? "Sem dono")}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-destructive">{form.formState.errors.id_animal?.message}</p>
        </div>

        <div>
          <label htmlFor="id_tipo_entrada_prontuario" className="mb-1 block text-sm font-medium">Tipo de entrada</label>
          <select
            id="id_tipo_entrada_prontuario"
            className="w-full rounded-md border px-3 py-2"
            value={form.watch("id_tipo_entrada_prontuario") ?? ""}
            onChange={(event) =>
              form.setValue("id_tipo_entrada_prontuario", Number(event.target.value), { shouldValidate: true })
            }
          >
            <option value="">Selecione...</option>
            {lookup.tiposEntrada.map((tipo) => (
              <option key={tipo.id_tipo_entrada_prontuario} value={tipo.id_tipo_entrada_prontuario}>
                {tipo.nome ?? `Tipo ${tipo.id_tipo_entrada_prontuario}`}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-destructive">{form.formState.errors.id_tipo_entrada_prontuario?.message}</p>
        </div>
      </div>

      <div>
        <label htmlFor="data_hora" className="mb-1 block text-sm font-medium">Data e hora</label>
        <input id="data_hora" type="datetime-local" {...form.register("data_hora")} className="w-full rounded-md border px-3 py-2" />
        <p className="mt-1 text-xs text-destructive">{form.formState.errors.data_hora?.message}</p>
      </div>

      <div>
        <label htmlFor="observacao" className="mb-1 block text-sm font-medium">Observacoes</label>
        <textarea id="observacao" {...form.register("observacao")} className="min-h-24 w-full rounded-md border px-3 py-2" />
        <p className="mt-1 text-xs text-destructive">{form.formState.errors.observacao?.message}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="medicamentos" className="mb-1 block text-sm font-medium">Medicamentos (N:N)</label>
          <select
            id="medicamentos"
            multiple
            className="min-h-40 w-full rounded-md border px-3 py-2"
            onChange={(event) => form.setValue("medicamentos", selectedValuesAsNumbers(event.currentTarget.options))}
          >
            {lookup.medicamentos.map((medicamento) => (
              <option key={medicamento.id_medicamento} value={medicamento.id_medicamento}>
                {medicamento.nome ?? `Medicamento ${medicamento.id_medicamento}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="funcionarios" className="mb-1 block text-sm font-medium">Funcionarios (N:N)</label>
          <select
            id="funcionarios"
            multiple
            className="min-h-40 w-full rounded-md border px-3 py-2"
            onChange={(event) => form.setValue("funcionarios", selectedValuesAsNumbers(event.currentTarget.options))}
          >
            {lookup.funcionarios.map((funcionario) => (
              <option key={funcionario.id_funcionario} value={funcionario.id_funcionario}>
                {funcionario.nome ?? `Funcionario ${funcionario.id_funcionario}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">Use Ctrl/Cmd para selecionar multiplos itens em cada lista.</p>

      {serverMessage ? <p className="text-sm">{serverMessage}</p> : null}

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        {form.formState.isSubmitting ? "Salvando..." : "Salvar entrada"}
      </button>
    </form>
  );
}
