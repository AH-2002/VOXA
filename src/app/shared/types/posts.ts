import { ObjectId } from "mongodb";

export type commentsType = {
  _id: ObjectId;
  user_id: string;
  content: string;
  createdAt: string;
};
export type SerializedComment = Omit<commentsType, "_id"> & { _id: string };

export type dbPostType = {
  _id: ObjectId;
  createdAt: string;
  content: string;
  userId: string;
  likes: string[];
  comments: commentsType[];
  mediaUrl?: string | null;
  mediaType?: "image" | "video" | null;
};
export type PostType = Omit<dbPostType, "_id" | "comments"> & {
  _id: string;
  comments: SerializedComment[];
};
