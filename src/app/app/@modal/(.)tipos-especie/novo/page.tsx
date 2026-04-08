import RouteModal from "@/features/shared/components/route-modal";
import TipoEspecieForm from "@/features/tipos-especie/tipo-especie-form";
import { createTipoEspecieAction } from "@/features/tipos-especie/actions";

export default function NovoTipoEspecieModalPage() {
  return (
    <RouteModal title="Novo Tipo de Especie" description="Cadastro de especie e raca.">
      <TipoEspecieForm onSubmit={createTipoEspecieAction} />
    </RouteModal>
  );
}
