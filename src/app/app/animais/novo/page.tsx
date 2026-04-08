import AnimalForm from "@/features/animais/animal-form";
import { createAnimalAction } from "@/features/animais/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function NovoAnimalPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ data: clientes }, { data: tiposEspecie }] = await Promise.all([
    supabase.from("cliente").select("id_cliente, nome").order("nome"),
    supabase.from("tipo_especie").select("id_tipo_especie, especie, raca").order("id_tipo_especie"),
  ]);

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Novo Animal</h2>
      <AnimalForm
        lookup={{
          clientes: clientes ?? [],
          tiposEspecie: tiposEspecie ?? [],
        }}
        onSubmit={createAnimalAction}
      />
    </section>
  );
}
