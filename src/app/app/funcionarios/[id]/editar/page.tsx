import FuncionarioForm from "@/features/funcionarios/funcionario-form";
import { deleteFuncionarioAction, updateFuncionarioAction } from "@/features/funcionarios/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarFuncionarioPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const idFuncionario = Number(id);

  if (!Number.isFinite(idFuncionario)) {
    notFound();
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("funcionario")
    .select("id_funcionario, nome, cpf, telefone, endereco")
    .eq("id_funcionario", idFuncionario)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Editar Funcionario</h2>
      <FuncionarioForm
        defaultValues={{
          nome: data.nome ?? "",
          cpf: data.cpf,
          telefone: data.telefone ?? "",
          endereco: data.endereco ?? "",
        }}
        onSubmit={updateFuncionarioAction.bind(null, idFuncionario)}
        onDelete={deleteFuncionarioAction.bind(null, idFuncionario)}
      />
    </section>
  );
}
