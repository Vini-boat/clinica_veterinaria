import CrudTable from "@/features/shared/components/crud-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { deleteMedicamentoAction } from "@/features/medicamentos/actions";

export default async function MedicamentosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("medicamento").select("id_medicamento, nome").order("id_medicamento");

  const rows = (data ?? []).map((item) => ({
    id: item.id_medicamento,
    nome: item.nome ?? "-",
  }));

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Medicamentos</h2>
      <CrudTable
        rows={rows}
        createHref="/app/medicamentos/novo"
        editHref={(id) => `/app/medicamentos/${id}/editar`}
        onDelete={deleteMedicamentoAction}
        columns={[{ key: "nome", label: "Nome", render: (row) => row.nome }]}
      />
    </section>
  );
}
