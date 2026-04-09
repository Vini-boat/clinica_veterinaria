import RouteModal from "@/features/shared/components/route-modal";
import TipoEspecieForm from "@/features/tipos-especie/tipo-especie-form";
import { deleteTipoEspecieAction, updateTipoEspecieAction } from "@/features/tipos-especie/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarTipoEspecieModalPage({
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
    .from("tipo_especie")
    .select("id_tipo_especie, especie, raca")
    .eq("id_tipo_especie", idTipo)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <RouteModal title="Editar Tipo de Especie" description="Atualizacao de especie e raca.">
      <TipoEspecieForm
        defaultValues={{
          especie: data.especie ?? "",
          raca: data.raca ?? "",
        }}
        onSubmit={updateTipoEspecieAction.bind(null, idTipo)}
        onDelete={deleteTipoEspecieAction.bind(null, idTipo)}
      />
    </RouteModal>
  );
}
