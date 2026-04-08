import TipoEntradaProntuarioForm from "@/features/tipos-entrada-prontuario/tipo-entrada-prontuario-form";
import { createTipoEntradaProntuarioAction } from "@/features/tipos-entrada-prontuario/actions";

export default function NovoTipoEntradaProntuarioPage() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Novo Tipo de Entrada</h2>
      <TipoEntradaProntuarioForm onSubmit={createTipoEntradaProntuarioAction} />
    </section>
  );
}
