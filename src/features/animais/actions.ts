"use server";

import { revalidatePath } from "next/cache";
import { animalSchema, type AnimalFormValues } from "./schema";
import { actionError, actionSuccess, getServerSupabase, type ActionState } from "@/features/shared/utils/server-action";

export async function createAnimalAction(values: AnimalFormValues): Promise<ActionState> {
  const parsed = animalSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const payload = {
    ...parsed.data,
    observacao: parsed.data.observacao || null,
  };

  const { error } = await supabase.from("animal").insert(payload);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/animais");
  revalidatePath("/app/prontuarios");
  return actionSuccess("Animal criado com sucesso");
}

export async function updateAnimalAction(idAnimal: number, values: AnimalFormValues): Promise<ActionState> {
  const parsed = animalSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const payload = {
    ...parsed.data,
    observacao: parsed.data.observacao || null,
  };

  const { error } = await supabase.from("animal").update(payload).eq("id_animal", idAnimal);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/animais");
  revalidatePath("/app/prontuarios");
  return actionSuccess("Animal atualizado com sucesso");
}

export async function deleteAnimalAction(idAnimal: number): Promise<void> {
  const supabase = await getServerSupabase();
  await supabase.from("animal").delete().eq("id_animal", idAnimal);
  revalidatePath("/app/animais");
  revalidatePath("/app/prontuarios");
}
