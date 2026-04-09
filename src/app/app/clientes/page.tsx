import CrudTable from "@/features/shared/components/crud-table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ClientesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("cliente").select("id_cliente, nome, cpf, telefone, endereco").order("id_cliente");

  const rows = (data ?? []).map((item) => ({
    id: item.id_cliente,
    nome: item.nome ?? "-",
    cpf: item.cpf,
    telefone: item.telefone ?? "-",
  }));

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Clientes</h2>
      <CrudTable
        rows={rows}
        createHref="/app/clientes/novo"
        editHref={(id) => `/app/clientes/${id}/editar`}
        columns={[
          { key: "nome", label: "Nome", render: (row) => row.nome },
          { key: "cpf", label: "CPF", render: (row) => row.cpf },
          { key: "telefone", label: "Telefone", render: (row) => row.telefone },
        ]}
      />
    </section>
  );
}
