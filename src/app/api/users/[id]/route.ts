import { getCollection } from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: Request, context: any) {
  const { params } = context as { params: { id: string } };

  const { id } = params;

  const usersCollection = await getCollection("users");
  const user = await usersCollection?.findOne({ _id: new ObjectId(id) });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}
