import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CanvaEmbed from "@/components/canvaenbed";
import DiagramEmbed from "@/components/diagramembed";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const canvaLink = "https://www.canva.com/design/DAHGHh_y7L0/lJGq-DjtcIGDCbmNB1yZxA/view?embed";
  const diagramLink = "https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000FF&edit=_blank&layers=1&nav=1&dark=auto#G1o-YoIykT7I36Lbq_VPFchSoJmYJRy0N8";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/");
  }

  const { data: animals } = await supabase.from("animal").select();

  return (
    <>
    <h1>Supabase + Next.js</h1>
    <CanvaEmbed embedUrl={canvaLink} />
    <DiagramEmbed embedUrl={diagramLink} />
    <ul>
      {animals?.map((animal) => (
        <li key={animal.id_animal}>{animal.nome}</li>
      ))}
    </ul>
    </>
  );
}
