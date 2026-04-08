import CrudTable from "@/features/shared/components/crud-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { deleteFuncionarioAction } from "@/features/funcionarios/actions";

export default async function FuncionariosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("funcionario")
    .select("id_funcionario, nome, cpf, telefone")
    .order("id_funcionario");

  const rows = (data ?? []).map((item) => ({
    id: item.id_funcionario,
    nome: item.nome ?? "-",
    cpf: item.cpf,
    telefone: item.telefone ?? "-",
  }));

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Funcionarios</h2>
      <CrudTable
        rows={rows}
        createHref="/app/funcionarios/novo"
        editHref={(id) => `/app/funcionarios/${id}/editar`}
        onDelete={deleteFuncionarioAction}
        columns={[
          { key: "nome", label: "Nome", render: (row) => row.nome },
          { key: "cpf", label: "CPF", render: (row) => row.cpf },
          { key: "telefone", label: "Telefone", render: (row) => row.telefone },
        ]}
      />
    </section>
  );
}
