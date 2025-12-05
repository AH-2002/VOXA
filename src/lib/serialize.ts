import { dbDiariesType } from "@/app/diaries/types";
import { dbPostType } from "@/app/shared/types/posts";
import { dbUserType } from "@/app/users/types";

export function serializePost(post: dbPostType) {
  if (!post) return undefined;

  return {
    ...post,
    _id: post._id.toString(),
    comments:
      post.comments?.map((c) => ({
        ...c,
        _id: c._id.toString(),
      })) ?? [],
  };
}

export function serializeUser(user: dbUserType) {
  if (!user) return undefined;
  return {
    ...user,
    _id: user?._id?.toString(),
  };
}
export function serializeDiary(diary: dbDiariesType) {
  if (!diary) return undefined;
  return {
    ...diary,
    _id: diary._id.toString(),
  };
}

export function formatDate(dateString: string | undefined | null) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
