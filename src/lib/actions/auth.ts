"use server";

import { createClient } from "@/lib/supabase/server";
import { signupSchema, SignupInput } from "@/lib/schemas/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(input: SignupInput) {
  const result = signupSchema.safeParse(input);

  if (!result.success) {
    return { error: "Datos de registro inválidos" };
  }

  const { fullName, email, password } = result.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
