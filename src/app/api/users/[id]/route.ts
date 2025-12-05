import { getCollection } from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(req: Request, context: Context) {
  const id = context.params.id;

  const usersCollection = await getCollection("users");
  const user = await usersCollection?.findOne({ _id: new ObjectId(id) });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
