"use server";

import { revalidatePath } from "next/cache";
import { tipoEntradaProntuarioSchema, type TipoEntradaProntuarioFormValues } from "./schema";
import { actionError, actionSuccess, getServerSupabase, type ActionState } from "@/features/shared/utils/server-action";

export async function createTipoEntradaProntuarioAction(values: TipoEntradaProntuarioFormValues): Promise<ActionState> {
  const parsed = tipoEntradaProntuarioSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("tipo_entrada_prontuario").insert(parsed.data);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/tipos-entrada-prontuario");
  return actionSuccess("Tipo de entrada criado com sucesso");
}

export async function updateTipoEntradaProntuarioAction(idTipo: number, values: TipoEntradaProntuarioFormValues): Promise<ActionState> {
  const parsed = tipoEntradaProntuarioSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase
    .from("tipo_entrada_prontuario")
    .update(parsed.data)
    .eq("id_tipo_entrada_prontuario", idTipo);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/tipos-entrada-prontuario");
  return actionSuccess("Tipo de entrada atualizado com sucesso");
}

export async function deleteTipoEntradaProntuarioAction(idTipo: number): Promise<void> {
  const supabase = await getServerSupabase();
  await supabase.from("tipo_entrada_prontuario").delete().eq("id_tipo_entrada_prontuario", idTipo);
  revalidatePath("/app/tipos-entrada-prontuario");
}
