import RouteModal from "@/features/shared/components/route-modal";
import FuncionarioForm from "@/features/funcionarios/funcionario-form";
import { createFuncionarioAction } from "@/features/funcionarios/actions";

export default function NovoFuncionarioModalPage() {
  return (
    <RouteModal title="Novo Funcionario" description="Cadastro de funcionario.">
      <FuncionarioForm onSubmit={createFuncionarioAction} />
    </RouteModal>
  );
}
