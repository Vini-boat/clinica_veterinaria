import CanvaEmbed from "@/components/canvaenbed";
import DiagramEmbed from "@/components/diagramembed";
import Link from "next/link";

export default function Page() {
  const canvaLink = "https://www.canva.com/design/DAHGHh_y7L0/lJGq-DjtcIGDCbmNB1yZxA/view?embed";
  const diagramLink = "https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000FF&edit=_blank&layers=1&nav=1&dark=auto#G1o-YoIykT7I36Lbq_VPFchSoJmYJRy0N8";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10">
      <section className="rounded-2xl border bg-card p-6 md:p-8">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Clinica Veterinaria</p>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Demonstracao de Modelagem Relacional</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Esta aplicacao demonstra o uso pratico de 3FN e relacionamentos N:N em um contexto real de clinica
          veterinaria, com CRUD das entidades principais e prontuario em timeline focado no animal.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/app" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Abrir area autenticada
          </Link>
          <Link href="/auth/login?next=/app" className="rounded-lg border px-4 py-2 text-sm font-medium">
            Login com Google
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-4">
          <h2 className="mb-3 text-lg font-semibold">Visao do Projeto</h2>
          <CanvaEmbed embedUrl={canvaLink} />
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <h2 className="mb-3 text-lg font-semibold">Diagrama Relacional</h2>
          <DiagramEmbed embedUrl={diagramLink} />
        </div>
      </section>
    </main>
  );
}
