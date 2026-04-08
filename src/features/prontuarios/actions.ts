"use server";

import { revalidatePath } from "next/cache";
import { entradaProntuarioSchema, type EntradaProntuarioFormValues } from "./schema";
import { actionError, actionSuccess, getServerSupabase, type ActionState } from "@/features/shared/utils/server-action";

export async function createEntradaProntuarioAction(values: EntradaProntuarioFormValues): Promise<ActionState> {
  const parsed = entradaProntuarioSchema.safeParse(values);
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Dados invalidos");
  }

  const supabase = await getServerSupabase();

  const { data: entry, error: entryError } = await supabase
    .from("entrada_prontuario")
    .insert({
      id_animal: parsed.data.id_animal,
      id_tipo_entrada_prontuario: parsed.data.id_tipo_entrada_prontuario,
      data_hora: new Date(parsed.data.data_hora).toISOString(),
      observacao: parsed.data.observacao,
    })
    .select("id_entrada_prontuario")
    .single();

  if (entryError || !entry) {
    return actionError(entryError?.message ?? "Nao foi possivel criar entrada de prontuario");
  }

  if (parsed.data.medicamentos.length > 0) {
    const aplicacoes = parsed.data.medicamentos.map((idMedicamento) => ({
      id_entrada_prontuario: entry.id_entrada_prontuario,
      id_medicamento: idMedicamento,
      data_hora: new Date(parsed.data.data_hora).toISOString(),
      dose: null,
    }));

    const { error } = await supabase.from("aplicacao").insert(aplicacoes);
    if (error) {
      return actionError(error.message);
    }
  }

  if (parsed.data.funcionarios.length > 0) {
    const participacoes = parsed.data.funcionarios.map((idFuncionario) => ({
      id_entrada_prontuario: entry.id_entrada_prontuario,
      id_funcionario: idFuncionario,
    }));

    const { error } = await supabase.from("participa").insert(participacoes);
    if (error) {
      return actionError(error.message);
    }
  }

  revalidatePath("/app/prontuarios");
  return actionSuccess("Entrada de prontuario criada com sucesso");
}
