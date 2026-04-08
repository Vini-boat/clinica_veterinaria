import EntradaProntuarioForm from "@/features/prontuarios/entrada-prontuario-form";
import { createEntradaProntuarioAction } from "@/features/prontuarios/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function NovaEntradaProntuarioPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ animalId?: string }>;
}>) {
  const resolvedSearchParams = await searchParams;
  const defaultAnimalId = Number(resolvedSearchParams.animalId);

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ data: animais }, { data: tiposEntrada }, { data: medicamentos }, { data: funcionarios }] = await Promise.all([
    supabase.from("animal").select("id_animal, nome, cliente:cliente(nome)").order("nome"),
    supabase.from("tipo_entrada_prontuario").select("id_tipo_entrada_prontuario, nome").order("nome"),
    supabase.from("medicamento").select("id_medicamento, nome").order("nome"),
    supabase.from("funcionario").select("id_funcionario, nome").order("nome"),
  ]);

  const animaisLookup = (animais ?? []).map((animal) => {
    const clienteRel = animal.cliente;
    const clienteNome = Array.isArray(clienteRel)
      ? (clienteRel[0]?.nome ?? null)
      : ((clienteRel as { nome: string | null } | null)?.nome ?? null);

    return {
      id_animal: animal.id_animal,
      nome: animal.nome,
      cliente_nome: clienteNome,
    };
  });

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Nova Entrada de Prontuario</h2>
      <EntradaProntuarioForm
        defaultAnimalId={Number.isFinite(defaultAnimalId) ? defaultAnimalId : undefined}
        lookup={{
          animais: animaisLookup,
          tiposEntrada: tiposEntrada ?? [],
          medicamentos: medicamentos ?? [],
          funcionarios: funcionarios ?? [],
        }}
        onSubmit={createEntradaProntuarioAction}
      />
    </section>
  );
}
