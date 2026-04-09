"use client";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AnimalOption = {
  id_animal: number;
  nome: string | null;
  cliente: { nome: string | null } | Array<{ nome: string | null }> | null;
};

function relationFirst<T>(relation: T | T[] | null | undefined): T | null {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation ?? null;
}

export default function AnimalFilter({
  animais,
  selectedAnimalId,
}: Readonly<{
  animais: AnimalOption[];
  selectedAnimalId?: number;
}>) {
  const router = useRouter();

  return (
    <div className="min-w-72">
      <Label htmlFor="animalId" className="mb-1 block text-sm font-medium">
        Animal
      </Label>
      <Select
        value={Number.isFinite(selectedAnimalId) ? String(selectedAnimalId) : undefined}
        onValueChange={(value) => router.replace(`/app/prontuarios?animalId=${value}`, { scroll: false })}
      >
        <SelectTrigger id="animalId" className="w-full">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {animais.map((animal) => (
              <SelectItem key={animal.id_animal} value={String(animal.id_animal)}>
                {(animal.nome ?? `Animal ${animal.id_animal}`) +
                  " - " +
                  (relationFirst(animal.cliente)?.nome ?? "Sem dono")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}