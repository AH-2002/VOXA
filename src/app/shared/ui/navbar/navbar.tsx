import NavbarLayout from "@/app/shared/ui/navbar/navbar-layout";
import { dbUserType } from "@/app/users/types";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { serializeUser } from "@/lib/serialize";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export default async function Navbar() {
  const userAuth = await getAuthUser();
  const usersCollection = await getCollection("users");
  const rawUser = (await usersCollection?.findOne({
    _id: new ObjectId(userAuth?.userId),
  })) as dbUserType;
  const user = serializeUser(rawUser);
  return <NavbarLayout user={user} />;
}
