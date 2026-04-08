import FuncionarioForm from "@/features/funcionarios/funcionario-form";
import { createFuncionarioAction } from "@/features/funcionarios/actions";

export default function NovoFuncionarioPage() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Novo Funcionario</h2>
      <FuncionarioForm onSubmit={createFuncionarioAction} />
    </section>
  );
}
