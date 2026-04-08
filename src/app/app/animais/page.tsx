import CrudTable from "@/features/shared/components/crud-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { deleteAnimalAction } from "@/features/animais/actions";

function relationFirst<T>(relation: T | T[] | null | undefined): T | null {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation ?? null;
}

export default async function AnimaisPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("animal")
    .select("id_animal, nome, cliente:cliente(nome), tipo_especie(especie, raca)")
    .order("id_animal");

  const rows = (data ?? []).map((item) => ({
    id: item.id_animal,
    nome: item.nome ?? "-",
    dono: relationFirst(item.cliente as { nome: string | null } | Array<{ nome: string | null }> | null)?.nome ?? "-",
    especie:
      (relationFirst(item.tipo_especie as { especie: string | null; raca: string | null } | Array<{ especie: string | null; raca: string | null }> | null)?.especie ?? "-") +
      " / " +
      (relationFirst(item.tipo_especie as { especie: string | null; raca: string | null } | Array<{ especie: string | null; raca: string | null }> | null)?.raca ?? "-"),
  }));

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Animais</h2>
      <CrudTable
        rows={rows}
        createHref="/app/animais/novo"
        editHref={(id) => `/app/animais/${id}/editar`}
        onDelete={deleteAnimalAction}
        columns={[
          { key: "nome", label: "Nome", render: (row) => row.nome },
          { key: "dono", label: "Cliente (dono)", render: (row) => row.dono },
          { key: "especie", label: "Especie/Raca", render: (row) => row.especie },
        ]}
      />
    </section>
  );
}
