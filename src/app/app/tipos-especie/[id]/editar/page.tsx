import TipoEspecieForm from "@/features/tipos-especie/tipo-especie-form";
import { updateTipoEspecieAction } from "@/features/tipos-especie/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarTipoEspeciePage({
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
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Editar Tipo de Especie</h2>
      <TipoEspecieForm
        defaultValues={{
          especie: data.especie ?? "",
          raca: data.raca ?? "",
        }}
        onSubmit={updateTipoEspecieAction.bind(null, idTipo)}
      />
    </section>
  );
}
