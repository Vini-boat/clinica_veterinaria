"use server";

import { revalidatePath } from "next/cache";
import { funcionarioSchema, type FuncionarioFormValues } from "./schema";
import { actionError, actionSuccess, getServerSupabase, type ActionState } from "@/features/shared/utils/server-action";

export async function createFuncionarioAction(values: FuncionarioFormValues): Promise<ActionState> {
  const parsed = funcionarioSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("funcionario").insert(parsed.data);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/funcionarios");
  return actionSuccess("Funcionario criado com sucesso");
}

export async function updateFuncionarioAction(idFuncionario: number, values: FuncionarioFormValues): Promise<ActionState> {
  const parsed = funcionarioSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("funcionario").update(parsed.data).eq("id_funcionario", idFuncionario);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/funcionarios");
  return actionSuccess("Funcionario atualizado com sucesso");
}

export async function deleteFuncionarioAction(idFuncionario: number): Promise<void> {
  const supabase = await getServerSupabase();
  await supabase.from("funcionario").delete().eq("id_funcionario", idFuncionario);
  revalidatePath("/app/funcionarios");
}
