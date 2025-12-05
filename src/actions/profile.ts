"use server";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { UpdateProfileSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";

export async function updateProfile(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const authUser = await getAuthUser();
  const validateFields = UpdateProfileSchema.safeParse({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword"),
    };
  }
  const usersCollection = await getCollection("users");
  const loggedInUser = await usersCollection?.findOne({
    _id: new ObjectId(userId),
  });
  if (loggedInUser?._id?.toString() !== authUser?.userId) redirect("/");
  const { first_name, last_name, password } = validateFields.data;
  const updateData: any = {};
  if (first_name) updateData.first_name = first_name;
  if (last_name) updateData.last_name = last_name;
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  const file = formData.get("profile_picture") as File | null;
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, `${userId}.jpg`);
    fs.writeFileSync(filePath, buffer);
    updateData.profile_picture = `/uploads/${userId}.jpg`;
  }
  await usersCollection?.findOneAndUpdate(
    { _id: loggedInUser?._id },
    {
      $set: updateData,
    }
  );
  redirect(`/profile/${userId}`);
}
