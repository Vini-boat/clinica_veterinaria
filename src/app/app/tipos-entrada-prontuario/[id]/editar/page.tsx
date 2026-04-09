import TipoEntradaProntuarioForm from "@/features/tipos-entrada-prontuario/tipo-entrada-prontuario-form";
import { deleteTipoEntradaProntuarioAction, updateTipoEntradaProntuarioAction } from "@/features/tipos-entrada-prontuario/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarTipoEntradaProntuarioPage({
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
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Editar Tipo de Entrada</h2>
      <TipoEntradaProntuarioForm
        defaultValues={{ nome: data.nome ?? "" }}
        onSubmit={updateTipoEntradaProntuarioAction.bind(null, idTipo)}
        onDelete={deleteTipoEntradaProntuarioAction.bind(null, idTipo)}
      />
    </section>
  );
}
