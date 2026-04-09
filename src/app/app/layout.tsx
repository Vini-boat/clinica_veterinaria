import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const navItems = [
  { href: "/app/clientes", label: "Clientes" },
  { href: "/app/animais", label: "Animais" },
  { href: "/app/funcionarios", label: "Funcionarios" },
  { href: "/app/medicamentos", label: "Medicamentos" },
  { href: "/app/tipos-especie", label: "Tipos de Especie" },
  { href: "/app/tipos-entrada-prontuario", label: "Tipos de Entrada" },
  { href: "/app/prontuarios", label: "Prontuarios" },
];

export default async function AppLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/app");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-sm text-muted-foreground">Clinica Veterinaria</p>
            <h1 className="text-lg font-semibold">Demo de Modelagem Relacional</h1>
          </div>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Voltar para landing
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border bg-card p-3 h-fit self-start sticky top-6">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>

      {modal}
    </div>
  );
}
