import TipoEspecieForm from "@/features/tipos-especie/tipo-especie-form";
import { createTipoEspecieAction } from "@/features/tipos-especie/actions";

export default function NovoTipoEspeciePage() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Novo Tipo de Especie</h2>
      <TipoEspecieForm onSubmit={createTipoEspecieAction} />
    </section>
  );
}
