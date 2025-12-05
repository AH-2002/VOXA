"use server";

import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(prevState: any, formData: FormData) {
  const validateFields = RegisterFormSchema.safeParse({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: (formData.get("email") ?? "") as string,
    password: (formData.get("password") ?? "") as string,
    confirmPassword: (formData.get("confirmPassword") ?? "") as string,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
  }

  const { first_name, last_name, email, password } = validateFields.data;

  const userCollection = await getCollection("users");

  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 10);
  if (existingUser) {
    return {
      errors: {
        first_name: [],
        last_name: [],
        email: ["Email already registered"],
        password: [],
        confirmPassword: [],
      },
    };
  }
  const results = await userCollection?.insertOne({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });

  await createSession(results.insertedId.toString());

  redirect("/");
}

export async function login(prevState: any, formData: FormData) {
  const validateFields = LoginFormSchema.safeParse({
    email: (formData.get("email") ?? "") as string,
    password: (formData.get("password") ?? "") as string,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      email: formData.get("email"),
      password: formData.get("password"),
    };
  }
  const { email, password } = validateFields.data;
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };
  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) {
    return { errors: { email: "This email is not registered" } };
  }
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) {
    return { errors: { password: "Incorrect password" } };
  }
  await createSession(existingUser._id.toString());
  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
