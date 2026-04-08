import RouteModal from "@/features/shared/components/route-modal";
import TipoEntradaProntuarioForm from "@/features/tipos-entrada-prontuario/tipo-entrada-prontuario-form";
import { createTipoEntradaProntuarioAction } from "@/features/tipos-entrada-prontuario/actions";

export default function NovoTipoEntradaProntuarioModalPage() {
  return (
    <RouteModal title="Novo Tipo de Entrada" description="Cadastro de tipo de entrada de prontuario.">
      <TipoEntradaProntuarioForm onSubmit={createTipoEntradaProntuarioAction} />
    </RouteModal>
  );
}
