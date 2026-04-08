import RouteModal from "@/features/shared/components/route-modal";
import MedicamentoForm from "@/features/medicamentos/medicamento-form";
import { createMedicamentoAction } from "@/features/medicamentos/actions";

export default function NovoMedicamentoModalPage() {
  return (
    <RouteModal title="Novo Medicamento" description="Cadastro de medicamento.">
      <MedicamentoForm onSubmit={createMedicamentoAction} />
    </RouteModal>
  );
}
