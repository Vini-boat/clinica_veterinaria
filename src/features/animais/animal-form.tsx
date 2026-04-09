"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { animalSchema, type AnimalFormValues } from "./schema";
import type { ActionState } from "@/features/shared/utils/server-action";
import { toNullableNumber } from "@/features/shared/utils/form-utils";
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

type AnimalSubmit = (values: AnimalFormValues) => Promise<{ ok: boolean; message: string }>;
type AnimalDelete = () => Promise<ActionState>;

type AnimalLookup = {
  clientes: Array<{ id_cliente: number; nome: string | null }>;
  tiposEspecie: Array<{ id_tipo_especie: number; especie: string | null; raca: string | null }>;
};

export default function AnimalForm({
  defaultValues,
  lookup,
  onSubmit,
  onDelete,
}: Readonly<{
  defaultValues?: Partial<AnimalFormValues>;
  lookup: AnimalLookup;
  onSubmit: AnimalSubmit;
  onDelete?: AnimalDelete;
}>) {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const idCliente = useWatch({ control: form.control, name: "id_cliente" });
  const idTipoEspecie = useWatch({ control: form.control, name: "id_tipo_especie" });
  const sexo = useWatch({ control: form.control, name: "sexo" });
  const porte = useWatch({ control: form.control, name: "porte" });
  const idade = useWatch({ control: form.control, name: "idade" });
  const pesoGramas = useWatch({ control: form.control, name: "peso_gramas" });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" {...form.register("nome")} aria-invalid={!!form.formState.errors.nome} />
        <p className="text-xs text-destructive">{form.formState.errors.nome?.message}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="id_cliente">Cliente dono</Label>
          <Select
            value={idCliente ? String(idCliente) : undefined}
            onValueChange={(value) => form.setValue("id_cliente", Number(value), { shouldValidate: true })}
          >
            <SelectTrigger id="id_cliente" className="w-full" aria-invalid={!!form.formState.errors.id_cliente}>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {lookup.clientes.map((cliente) => (
                  <SelectItem key={cliente.id_cliente} value={String(cliente.id_cliente)}>
                    {cliente.nome ?? `Cliente ${cliente.id_cliente}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-destructive">{form.formState.errors.id_cliente?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="id_tipo_especie">Especie e raca</Label>
          <Select
            value={idTipoEspecie ? String(idTipoEspecie) : undefined}
            onValueChange={(value) => form.setValue("id_tipo_especie", Number(value), { shouldValidate: true })}
          >
            <SelectTrigger id="id_tipo_especie" className="w-full" aria-invalid={!!form.formState.errors.id_tipo_especie}>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {lookup.tiposEspecie.map((tipo) => (
                  <SelectItem key={tipo.id_tipo_especie} value={String(tipo.id_tipo_especie)}>
                    {(tipo.especie ?? "Especie") + " - " + (tipo.raca ?? "Raca")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-destructive">{form.formState.errors.id_tipo_especie?.message}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="sexo">Sexo</Label>
          <Select
            value={sexo ?? "nao-informado"}
            onValueChange={(value) => form.setValue("sexo", value === "nao-informado" ? null : (value as "Macho" | "Femea"))}
          >
            <SelectTrigger id="sexo" className="w-full">
              <SelectValue placeholder="Nao informado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="nao-informado">Nao informado</SelectItem>
                <SelectItem value="Macho">Macho</SelectItem>
                <SelectItem value="Femea">Femea</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="porte">Porte</Label>
          <Select
            value={porte ?? "nao-informado"}
            onValueChange={(value) =>
              form.setValue("porte", value === "nao-informado" ? null : (value as "Pequeno" | "Medio" | "Grande"))
            }
          >
            <SelectTrigger id="porte" className="w-full">
              <SelectValue placeholder="Nao informado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="nao-informado">Nao informado</SelectItem>
                <SelectItem value="Pequeno">Pequeno</SelectItem>
                <SelectItem value="Medio">Medio</SelectItem>
                <SelectItem value="Grande">Grande</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="idade">Idade (anos)</Label>
          <Input
            id="idade"
            type="number"
            value={idade ?? ""}
            onChange={(event) => form.setValue("idade", toNullableNumber(event.target.value), { shouldValidate: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="peso_gramas">Peso (g)</Label>
          <Input
            id="peso_gramas"
            type="number"
            value={pesoGramas ?? ""}
            onChange={(event) => form.setValue("peso_gramas", toNullableNumber(event.target.value), { shouldValidate: true })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="observacao">Observacao</Label>
        <Textarea id="observacao" {...form.register("observacao")} className="min-h-20" />
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
