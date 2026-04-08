import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export type ActionState = {
  ok: boolean;
  message: string;
};

export async function getServerSupabase() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export function actionSuccess(message: string): ActionState {
  return { ok: true, message };
}

export function actionError(message: string): ActionState {
  return { ok: false, message };
}
