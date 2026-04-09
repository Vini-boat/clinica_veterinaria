"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { entradaProntuarioSchema, type EntradaProntuarioFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SearchableMultiSelect from "@/features/shared/components/searchable-multi-select";

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

  const idAnimal = useWatch({ control: form.control, name: "id_animal" });
  const idTipoEntradaProntuario = useWatch({
    control: form.control,
    name: "id_tipo_entrada_prontuario",
  });
  const medicamentosSelecionados = useWatch({ control: form.control, name: "medicamentos" }) ?? [];
  const funcionariosSelecionados = useWatch({ control: form.control, name: "funcionarios" }) ?? [];

  const setNumberSelection = (
    field: "medicamentos" | "funcionarios",
    next: number[],
  ) => {
    form.setValue(field, next, { shouldValidate: true });
  };

  const medicamentoOptions = lookup.medicamentos.map((medicamento) => ({
    id: medicamento.id_medicamento,
    label: medicamento.nome?.trim() || "Medicamento sem nome",
  }));

  const funcionarioOptions = lookup.funcionarios.map((funcionario) => ({
    id: funcionario.id_funcionario,
    label: funcionario.nome?.trim() || "Funcionario sem nome",
  }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="id_animal">Animal</Label>
          <Select
            value={idAnimal ? String(idAnimal) : undefined}
            onValueChange={(value) => form.setValue("id_animal", Number(value), { shouldValidate: true })}
          >
            <SelectTrigger id="id_animal" className="w-full" aria-invalid={!!form.formState.errors.id_animal}>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {lookup.animais.map((animal) => (
                  <SelectItem key={animal.id_animal} value={String(animal.id_animal)}>
                    {(animal.nome ?? `Animal ${animal.id_animal}`) + " - " + (animal.cliente_nome ?? "Sem dono")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-destructive">{form.formState.errors.id_animal?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="id_tipo_entrada_prontuario">Tipo de entrada</Label>
          <Select
            value={idTipoEntradaProntuario ? String(idTipoEntradaProntuario) : undefined}
            onValueChange={(value) =>
              form.setValue("id_tipo_entrada_prontuario", Number(value), { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="id_tipo_entrada_prontuario"
              className="w-full"
              aria-invalid={!!form.formState.errors.id_tipo_entrada_prontuario}
            >
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {lookup.tiposEntrada.map((tipo) => (
                  <SelectItem key={tipo.id_tipo_entrada_prontuario} value={String(tipo.id_tipo_entrada_prontuario)}>
                    {tipo.nome ?? `Tipo ${tipo.id_tipo_entrada_prontuario}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-destructive">{form.formState.errors.id_tipo_entrada_prontuario?.message}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="data_hora">Data e hora</Label>
        <Input
          id="data_hora"
          type="datetime-local"
          {...form.register("data_hora")}
          aria-invalid={!!form.formState.errors.data_hora}
        />
        <p className="text-xs text-destructive">{form.formState.errors.data_hora?.message}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="observacao">Observacoes</Label>
        <Textarea
          id="observacao"
          {...form.register("observacao")}
          className="min-h-24"
          aria-invalid={!!form.formState.errors.observacao}
        />
        <p className="text-xs text-destructive">{form.formState.errors.observacao?.message}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Medicamentos (N:N)</Label>
          <SearchableMultiSelect
            options={medicamentoOptions}
            selectedIds={medicamentosSelecionados}
            onSelectionChange={(next) => setNumberSelection("medicamentos", next)}
            placeholder="Buscar e selecionar medicamentos..."
            searchPlaceholder="Pesquisar medicamento..."
            emptySearchText="Nenhum medicamento encontrado"
            emptySelectionText="Nenhum medicamento selecionado"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Funcionarios (N:N)</Label>
          <SearchableMultiSelect
            options={funcionarioOptions}
            selectedIds={funcionariosSelecionados}
            onSelectionChange={(next) => setNumberSelection("funcionarios", next)}
            placeholder="Buscar e selecionar funcionarios..."
            searchPlaceholder="Pesquisar funcionario..."
            emptySearchText="Nenhum funcionario encontrado"
            emptySelectionText="Nenhum funcionario selecionado"
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">Selecione os itens vinculados em cada lista.</p>

      {serverMessage ? <p className="text-sm">{serverMessage}</p> : null}

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Salvando..." : "Salvar entrada"}
      </Button>
    </form>
  );
}
