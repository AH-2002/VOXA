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

    const liked = Array.isArray(post.likes) && post.likes.includes(user.userId);

    if (liked) {
      await postsCollection?.updateOne(
        { _id: post._id },
        { $pull: { likes: user.userId as any } }
      );
    } else {
      await postsCollection?.updateOne(
        { _id: post._id },
        { $addToSet: { likes: user.userId } }
      );
    }

    return NextResponse.json({
      success: true,
      liked: !liked,
      userId: user.userId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
