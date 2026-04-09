"use server";

import { revalidatePath } from "next/cache";
import { tipoEspecieSchema, type TipoEspecieFormValues } from "./schema";
import { actionError, actionSuccess, getServerSupabase, type ActionState } from "@/features/shared/utils/server-action";

export async function createTipoEspecieAction(values: TipoEspecieFormValues): Promise<ActionState> {
  const parsed = tipoEspecieSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("tipo_especie").insert(parsed.data);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/tipos-especie");
  return actionSuccess("Tipo de especie criado com sucesso");
}

export async function updateTipoEspecieAction(idTipoEspecie: number, values: TipoEspecieFormValues): Promise<ActionState> {
  const parsed = tipoEspecieSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("tipo_especie").update(parsed.data).eq("id_tipo_especie", idTipoEspecie);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/tipos-especie");
  return actionSuccess("Tipo de especie atualizado com sucesso");
}

export async function deleteTipoEspecieAction(idTipoEspecie: number): Promise<ActionState> {
  const supabase = await getServerSupabase();
  const { error } = await supabase.from("tipo_especie").delete().eq("id_tipo_especie", idTipoEspecie);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/tipos-especie");
  return actionSuccess("Tipo de especie excluido com sucesso");
}
