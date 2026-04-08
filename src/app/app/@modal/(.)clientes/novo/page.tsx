import RouteModal from "@/features/shared/components/route-modal";
import ClienteForm from "@/features/clientes/cliente-form";
import { createClienteAction } from "@/features/clientes/actions";

export default function NovoClienteModalPage() {
  return (
    <RouteModal title="Novo Cliente" description="Cadastro da tabela de apoio cliente.">
      <ClienteForm onSubmit={createClienteAction} />
    </RouteModal>
  );
}
