import AnimalForm from "@/features/animais/animal-form";
import { deleteAnimalAction, updateAnimalAction } from "@/features/animais/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarAnimalPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const idAnimal = Number(id);

  if (!Number.isFinite(idAnimal)) {
    notFound();
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ data: animal }, { data: clientes }, { data: tiposEspecie }] = await Promise.all([
    supabase
      .from("animal")
      .select("id_animal, nome, id_cliente, id_tipo_especie, sexo, porte, idade, peso_gramas, observacao")
      .eq("id_animal", idAnimal)
      .single(),
    supabase.from("cliente").select("id_cliente, nome").order("nome"),
    supabase.from("tipo_especie").select("id_tipo_especie, especie, raca").order("id_tipo_especie"),
  ]);

  if (!animal) {
    notFound();
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Editar Animal</h2>
      <AnimalForm
        defaultValues={{
          nome: animal.nome ?? "",
          id_cliente: animal.id_cliente ?? undefined,
          id_tipo_especie: animal.id_tipo_especie ?? undefined,
          sexo: animal.sexo,
          porte: animal.porte,
          idade: animal.idade,
          peso_gramas: animal.peso_gramas,
          observacao: animal.observacao ?? "",
        }}
        lookup={{
          clientes: clientes ?? [],
          tiposEspecie: tiposEspecie ?? [],
        }}
        onSubmit={updateAnimalAction.bind(null, idAnimal)}
        onDelete={deleteAnimalAction.bind(null, idAnimal)}
      />
    </section>
  );
}
