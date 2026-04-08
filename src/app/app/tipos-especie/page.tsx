import CrudTable from "@/features/shared/components/crud-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { deleteTipoEspecieAction } from "@/features/tipos-especie/actions";

export default async function TiposEspeciePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("tipo_especie").select("id_tipo_especie, especie, raca").order("id_tipo_especie");

  const rows = (data ?? []).map((item) => ({
    id: item.id_tipo_especie,
    especie: item.especie ?? "-",
    raca: item.raca ?? "-",
  }));

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Tipos de Especie</h2>
      <CrudTable
        rows={rows}
        createHref="/app/tipos-especie/novo"
        editHref={(id) => `/app/tipos-especie/${id}/editar`}
        onDelete={deleteTipoEspecieAction}
        columns={[
          { key: "especie", label: "Especie", render: (row) => row.especie },
          { key: "raca", label: "Raca", render: (row) => row.raca },
        ]}
      />
    </section>
  );
}
