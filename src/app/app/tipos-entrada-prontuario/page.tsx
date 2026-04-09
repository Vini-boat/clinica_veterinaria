import CrudTable from "@/features/shared/components/crud-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function TiposEntradaProntuarioPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("tipo_entrada_prontuario")
    .select("id_tipo_entrada_prontuario, nome")
    .order("id_tipo_entrada_prontuario");

  const rows = (data ?? []).map((item) => ({
    id: item.id_tipo_entrada_prontuario,
    nome: item.nome ?? "-",
  }));

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Tipos de Entrada de Prontuario</h2>
      <CrudTable
        rows={rows}
        createHref="/app/tipos-entrada-prontuario/novo"
        editHref={(id) => `/app/tipos-entrada-prontuario/${id}/editar`}
        columns={[{ key: "nome", label: "Nome", render: (row) => row.nome }]}
      />
    </section>
  );
}
