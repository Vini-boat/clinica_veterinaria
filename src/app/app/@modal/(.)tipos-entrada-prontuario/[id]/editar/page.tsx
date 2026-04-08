import RouteModal from "@/features/shared/components/route-modal";
import TipoEntradaProntuarioForm from "@/features/tipos-entrada-prontuario/tipo-entrada-prontuario-form";
import { updateTipoEntradaProntuarioAction } from "@/features/tipos-entrada-prontuario/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarTipoEntradaProntuarioModalPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const idTipo = Number(id);

  if (!Number.isFinite(idTipo)) {
    notFound();
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("tipo_entrada_prontuario")
    .select("id_tipo_entrada_prontuario, nome")
    .eq("id_tipo_entrada_prontuario", idTipo)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <RouteModal title="Editar Tipo de Entrada" description="Atualizacao de tipo de entrada existente.">
      <TipoEntradaProntuarioForm defaultValues={{ nome: data.nome ?? "" }} onSubmit={updateTipoEntradaProntuarioAction.bind(null, idTipo)} />
    </RouteModal>
  );
}
