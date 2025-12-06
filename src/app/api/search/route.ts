import { getCollection } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const usersCollection = await getCollection("users");
  const users = await usersCollection
    ?.find({
      $or: [
        { first_name: { $regex: q, $options: "i" } },
        { last_name: { $regex: q, $options: "i" } },
      ],
    })
    .limit(10)
    .toArray();
  return NextResponse.json(users);
}
