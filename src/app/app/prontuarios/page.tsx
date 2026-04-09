import EmptyState from "@/features/shared/components/empty-state";
import AnimalFilter from "@/features/prontuarios/animal-filter";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Plus } from "lucide-react";
import Link from "next/link";

function formatDateTime(dateTimeIso: string | null): { date: string; time: string; dayKey: string } {
  const value = dateTimeIso ? new Date(dateTimeIso) : new Date();

  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value);

  const time = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);

  const dayKey = value.toISOString().slice(0, 10);

  return { date, time, dayKey };
}

function relationFirst<T>(relation: T | T[] | null | undefined): T | null {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation ?? null;
}

export default async function ProntuariosPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ animalId?: string }>;
}>) {
  const resolvedSearchParams = await searchParams;
  const selectedAnimalId = Number(resolvedSearchParams.animalId);

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: animais } = await supabase
    .from("animal")
    .select("id_animal, nome, cliente:cliente(nome)")
    .order("nome");

  const hasSelectedAnimal = Number.isFinite(selectedAnimalId);

  const { data: selectedAnimal } = hasSelectedAnimal
    ? await supabase
        .from("animal")
        .select("id_animal, nome, sexo, porte, idade, peso_gramas, cliente:cliente(nome, cpf)")
        .eq("id_animal", selectedAnimalId)
        .single()
    : { data: null };

  const { data: entradas } = hasSelectedAnimal
    ? await supabase
        .from("entrada_prontuario")
        .select(
          "id_entrada_prontuario, data_hora, observacao, tipo_entrada_prontuario(nome), aplicacao(id_aplicacao, dose, medicamento(nome)), participa(id_participa, funcionario(nome))"
        )
        .eq("id_animal", selectedAnimalId)
        .order("data_hora", { ascending: false })
    : { data: [] };

  return (
    <section className="space-y-4">
      <div className="rounded-xl border bg-card p-4">
        <h2 className="text-2xl font-semibold">Prontuario por Animal</h2>
        <p className="mt-1 text-sm text-muted-foreground">Selecione um animal para visualizar a timeline clinica em ordem decrescente.</p>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <AnimalFilter animais={animais ?? []} selectedAnimalId={hasSelectedAnimal ? selectedAnimalId : undefined} />
        </div>
      </div>

      {selectedAnimal ? (
        <section className="rounded-xl border bg-card p-4">
            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <p><span className="font-medium">Nome:</span> {selectedAnimal.nome ?? "-"}</p>
            <p><span className="font-medium">Cliente:</span> {relationFirst(selectedAnimal.cliente as { nome: string | null } | Array<{ nome: string | null }> | null)?.nome ?? "-"}</p>
            <p><span className="font-medium">CPF dono:</span> {relationFirst(selectedAnimal.cliente as { cpf: string | null } | Array<{ cpf: string | null }> | null)?.cpf ?? "-"}</p>
            <p><span className="font-medium">Sexo/Porte:</span> {(selectedAnimal.sexo ?? "-") + " / " + (selectedAnimal.porte ?? "-")}</p>
          </div>
        </section>
      ) : null}

      {!hasSelectedAnimal ? (
        <EmptyState
          title="Selecione um animal"
          description="A timeline de prontuario e carregada somente apos selecionar o pet no filtro acima."
        />
      ) : (
        <section className="rounded-xl border bg-card p-4">
          <h3 className="mb-4 text-lg font-semibold">Timeline Clinica</h3>
          <div className="space-y-4">
            <Button asChild variant="outline" className="h-auto min-h-24 w-full rounded-lg border-dashed p-4">
              <Link href={`/app/prontuarios/nova-entrada?animalId=${selectedAnimalId}`} className="flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
              </Link>
            </Button>

            {(entradas?.length ?? 0) === 0 ? (
              <EmptyState
                title="Sem entradas de prontuario"
                description="Nenhuma entrada encontrada para o animal selecionado. Use o item Nova entrada no topo da timeline para inserir o primeiro evento."
              />
            ) : null}

            {(entradas ?? []).map((entrada, index, array) => {
              const current = formatDateTime(entrada.data_hora);
              const previous = index > 0 ? formatDateTime(array[index - 1].data_hora) : null;
              const showDayDivider = !previous || previous.dayKey !== current.dayKey;

              const tipoEntrada =
                relationFirst(
                  entrada.tipo_entrada_prontuario as
                    | { nome: string | null }
                    | Array<{ nome: string | null }>
                    | null
                )?.nome ?? "Sem tipo";
              const aplicacoes = (entrada.aplicacao as Array<{ medicamento: unknown }> | null) ?? [];
              const medicamentos = aplicacoes
                .map((aplicacao) =>
                  relationFirst(
                    aplicacao.medicamento as { nome: string | null } | Array<{ nome: string | null }> | null
                  )?.nome
                )
                .filter(Boolean) as string[];
              const participacoes = (entrada.participa as Array<{ funcionario: unknown }> | null) ?? [];
              const funcionarios = participacoes
                .map((participacao) =>
                  relationFirst(
                    participacao.funcionario as { nome: string | null } | Array<{ nome: string | null }> | null
                  )?.nome
                )
                .filter(Boolean) as string[];

              return (
                <div key={entrada.id_entrada_prontuario}>
                  {showDayDivider ? (
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-xs font-medium text-muted-foreground">{current.date}</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  ) : null}

                  <article className="grid gap-3 rounded-lg border p-4 md:grid-cols-[120px_1fr]">
                    <div className="text-sm text-muted-foreground">
                      <p>{current.time}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{tipoEntrada}</span>
                      </div>
                      <p className="text-sm">{entrada.observacao ?? "Sem observacoes"}</p>

                      <div className="space-y-2">
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Medicamentos (N:N)</p>
                          <div className="flex flex-wrap gap-2">
                            {medicamentos.length > 0 ? (
                              medicamentos.map((nome, medIndex) => (
                                <span key={`${entrada.id_entrada_prontuario}-med-${medIndex}`} className="rounded-full border px-2 py-1 text-xs">
                                  {nome}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">Nenhum medicamento associado</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Funcionarios (N:N)</p>
                          <div className="flex flex-wrap gap-2">
                            {funcionarios.length > 0 ? (
                              funcionarios.map((nome, funIndex) => (
                                <span key={`${entrada.id_entrada_prontuario}-fun-${funIndex}`} className="rounded-full border px-2 py-1 text-xs">
                                  {nome}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">Nenhum funcionario associado</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}
