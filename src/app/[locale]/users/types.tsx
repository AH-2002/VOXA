import { ObjectId } from "mongodb";

export type dbUserType = {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_picture?: string;
};
export type UserType = Omit<dbUserType, "_id" | "password"> & { _id: string };
