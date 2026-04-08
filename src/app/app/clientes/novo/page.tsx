import ClienteForm from "@/features/clientes/cliente-form";
import { createClienteAction } from "@/features/clientes/actions";

export default function NovoClientePage() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Novo Cliente</h2>
      <ClienteForm onSubmit={createClienteAction} />
    </section>
  );
}
