import MedicamentoForm from "@/features/medicamentos/medicamento-form";
import { createMedicamentoAction } from "@/features/medicamentos/actions";

export default function NovoMedicamentoPage() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Novo Medicamento</h2>
      <MedicamentoForm onSubmit={createMedicamentoAction} />
    </section>
  );
}
