"use server";

import { revalidatePath } from "next/cache";
import { clienteSchema, type ClienteFormValues } from "./schema";
import { actionError, actionSuccess, getServerSupabase, type ActionState } from "@/features/shared/utils/server-action";

export async function createClienteAction(values: ClienteFormValues): Promise<ActionState> {
  const parsed = clienteSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("cliente").insert(parsed.data);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/clientes");
  return actionSuccess("Cliente criado com sucesso");
}

export async function updateClienteAction(idCliente: number, values: ClienteFormValues): Promise<ActionState> {
  const parsed = clienteSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("cliente").update(parsed.data).eq("id_cliente", idCliente);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/clientes");
  return actionSuccess("Cliente atualizado com sucesso");
}

export async function deleteClienteAction(idCliente: number): Promise<ActionState> {
  const supabase = await getServerSupabase();
  const { error } = await supabase.from("cliente").delete().eq("id_cliente", idCliente);
  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/app/clientes");
  return actionSuccess("Cliente excluido com sucesso");
}
