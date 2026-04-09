import MedicamentoForm from "@/features/medicamentos/medicamento-form";
import { deleteMedicamentoAction, updateMedicamentoAction } from "@/features/medicamentos/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EditarMedicamentoPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const idMedicamento = Number(id);

  if (!Number.isFinite(idMedicamento)) {
    notFound();
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("medicamento")
    .select("id_medicamento, nome")
    .eq("id_medicamento", idMedicamento)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Editar Medicamento</h2>
      <MedicamentoForm
        defaultValues={{ nome: data.nome ?? "" }}
        onSubmit={updateMedicamentoAction.bind(null, idMedicamento)}
        onDelete={deleteMedicamentoAction.bind(null, idMedicamento)}
      />
    </section>
  );
}
