"use server";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { diariesSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createDiary(prevState: any, formData: FormData) {
  const user = await getAuthUser();
  const validateFields = diariesSchema.safeParse({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      title: formData.get("title"),
      content: formData.get("content"),
    };
  }
  try {
    const diariesCollection = await getCollection("diaries");
    const diary = {
      createdAt: new Date().toISOString(),
      title: validateFields.data.title,
      content: validateFields.data.content,
      userId: user?.userId,
    };
    await diariesCollection?.insertOne(diary);
  } catch (error: any) {
    return { errors: { title: error.message } };
  }
  redirect("/diaries");
}

export async function updateDiary(prevState: any, formData: FormData) {
  const user = await getAuthUser();
  const diaryId = new ObjectId(formData.get("diaryId") as string);
  const validateFields = diariesSchema.safeParse({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      title: formData.get("title"),
      content: formData.get("content"),
    };
  }
  const diariesCollection = await getCollection("diaries");
  const diary = await diariesCollection?.findOne({ _id: diaryId });
  if (diary?.userId !== user?.userId) redirect("/");
  await diariesCollection?.findOneAndUpdate(
    { _id: diaryId },
    {
      $set: {
        title: validateFields.data.title,
        content: validateFields.data.content,
      },
    }
  );
  redirect("/diaries");
}

export async function deleteDiary(formData: FormData) {
  const user = await getAuthUser();
  const diaryId = new ObjectId(formData.get("diaryId") as string);

  const diariesCollection = await getCollection("diaries");
  const diary = await diariesCollection?.findOne({ _id: diaryId });
  if (user?.userId !== diary?.userId) redirect("/");
  await diariesCollection?.deleteOne({ _id: diaryId });
  redirect("/diaries");
}
