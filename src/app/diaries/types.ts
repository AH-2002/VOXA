import { ObjectId } from "mongodb";

export type dbDiariesType = {
  _id: ObjectId;
  createdAt: string;
  title: string;
  content: string;
  userId: string;
};

export type diariesType = Omit<dbDiariesType, "_id"> & { _id: string };
