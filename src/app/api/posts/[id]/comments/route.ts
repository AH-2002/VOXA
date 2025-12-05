import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const resolvedParams = await params;
    const postId = resolvedParams.id;
    if (!postId || postId.length !== 24)
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    const postsCollection = await getCollection("posts");
    const post = await postsCollection?.findOne({ _id: new ObjectId(postId) });
    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    const { content } = await req.json();
    if (!content || content.trim() === "")
      return NextResponse.json(
        { error: "Comment content cannot be empty" },
        { status: 400 }
      );
    const comment = {
      _id: new ObjectId(),
      user_id: user.userId.toString(),
      content,
      createdAt: new Date().toISOString(),
    };
    const result = await postsCollection?.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: comment } } as any
    );
    if (!result?.modifiedCount)
      return NextResponse.json(
        { error: "Failed to add comment" },
        { status: 500 }
      );
    return NextResponse.json({
      success: true,
      comment: {
        ...comment,
        _id: comment._id.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
