"use server";

import { revalidatePath } from "next/cache";
import { medicamentoSchema, type MedicamentoFormValues } from "./schema";
import { actionError, actionSuccess, getServerSupabase, type ActionState } from "@/features/shared/utils/server-action";

export async function createMedicamentoAction(values: MedicamentoFormValues): Promise<ActionState> {
  const parsed = medicamentoSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("medicamento").insert(parsed.data);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/medicamentos");
  return actionSuccess("Medicamento criado com sucesso");
}

export async function updateMedicamentoAction(idMedicamento: number, values: MedicamentoFormValues): Promise<ActionState> {
  const parsed = medicamentoSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("medicamento").update(parsed.data).eq("id_medicamento", idMedicamento);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/medicamentos");
  return actionSuccess("Medicamento atualizado com sucesso");
}

export async function deleteMedicamentoAction(idMedicamento: number): Promise<void> {
  const supabase = await getServerSupabase();
  await supabase.from("medicamento").delete().eq("id_medicamento", idMedicamento);
  revalidatePath("/app/medicamentos");
}
