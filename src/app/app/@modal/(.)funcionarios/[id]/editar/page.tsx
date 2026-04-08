import RouteModal from "@/features/shared/components/route-modal";
import FuncionarioForm from "@/features/funcionarios/funcionario-form";
import { updateFuncionarioAction } from "@/features/funcionarios/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarFuncionarioModalPage({
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
    <RouteModal title="Editar Funcionario" description="Atualizacao de funcionario existente.">
      <FuncionarioForm
        defaultValues={{
          nome: data.nome ?? "",
          cpf: data.cpf,
          telefone: data.telefone ?? "",
          endereco: data.endereco ?? "",
        }}
        onSubmit={updateFuncionarioAction.bind(null, idFuncionario)}
      />
    </RouteModal>
  );
}
