"use server";

import { uploadMedia } from "@/lib/cloudinary";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
  const user = await getAuthUser();

  const validateFields = BlogPostSchema.safeParse({
    content: formData.get("content") as string,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      content: formData.get("content"),
    };
  }
  let mediaUrl = null;
  let mediaType = null;
  const file = formData.get("media") as File;
  if (file && file.size > 0) {
    const uploaded = (await uploadMedia(file)) as any;
    mediaUrl = uploaded.secure_url;
    mediaType = uploaded.resource_type;
  }
  try {
    const postsCollection = await getCollection("posts");
    const post = {
      createdAt: new Date().toISOString(),
      content: validateFields.data.content,
      userId: user?.userId,
      likes: [],
      mediaUrl,
      mediaType,
    };
    await postsCollection?.insertOne(post);
  } catch (error: any) {
    return { errors: { content: error.message } };
  }

  redirect("/");
}

export async function updatePost(prevState: any, formData: FormData) {
  const user = await getAuthUser();

  const postId = new ObjectId(formData.get("postId") as string);
  const validateFields = BlogPostSchema.safeParse({
    content: formData.get("content") as string,
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      content: formData.get("content"),
    };
  }

  const postsCollection = await getCollection("posts");
  const post = await postsCollection?.findOne({
    _id: postId,
  });
  if (user?.userId !== post?.userId.toString()) redirect("/");
  const file = formData.get("media") as File;
  let mediaUrl = post?.mediaUrl;
  let mediaType = post?.mediaType;
  if (file && file.size > 0) {
    const uploaded = (await uploadMedia(file)) as any;
    mediaUrl = uploaded.secure_url;
    mediaType = uploaded.resource_type;
  }
  await postsCollection?.findOneAndUpdate(
    { _id: post?._id },
    {
      $set: {
        content: validateFields.data.content,
        mediaUrl,
        mediaType,
      },
    }
  );

  redirect("/");
}

export async function deletePost(formData: FormData) {
  const user = await getAuthUser();
  const postId = new ObjectId(formData.get("postId") as string);
  const postsCollection = await getCollection("posts");
  const post = await postsCollection?.findOne({
    _id: postId,
  });
  if (user?.userId !== post?.userId.toString()) redirect("/");

  await postsCollection?.findOneAndDelete({ _id: postId });

  revalidatePath("/");
  redirect("/");
}
