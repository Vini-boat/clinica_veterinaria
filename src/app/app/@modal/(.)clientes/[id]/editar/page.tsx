import RouteModal from "@/features/shared/components/route-modal";
import ClienteForm from "@/features/clientes/cliente-form";
import { updateClienteAction } from "@/features/clientes/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarClienteModalPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const idCliente = Number(id);

  if (!Number.isFinite(idCliente)) {
    notFound();
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("cliente")
    .select("id_cliente, nome, cpf, telefone, endereco")
    .eq("id_cliente", idCliente)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <RouteModal title="Editar Cliente" description="Atualizacao de registro existente.">
      <ClienteForm
        defaultValues={{
          nome: data.nome ?? "",
          cpf: data.cpf,
          telefone: data.telefone ?? "",
          endereco: data.endereco ?? "",
        }}
        onSubmit={updateClienteAction.bind(null, idCliente)}
      />
    </RouteModal>
  );
}
