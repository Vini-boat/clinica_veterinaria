import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CanvaEmbed from '@/app/components/canvaenbed';

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const canvaLink = "https://www.canva.com/design/DAHGHh_y7L0/lJGq-DjtcIGDCbmNB1yZxA/view?embed";

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
    <ul>
      {animals?.map((animal) => (
        <li key={animal.id_animal}>{animal.nome}</li>
      ))}
    </ul>
    </>
  );
}
