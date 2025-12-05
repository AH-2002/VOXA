import PostCard from "@/app/shared/ui/cards/post-card";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { serializePost } from "@/lib/serialize";
import PostButton from "@/components/post-buttons";
import { dbPostType, PostType } from "./shared/types/posts";

export default async function Home() {
  const postsCollection = await getCollection("posts");
  const rawPosts = (await postsCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray()) as dbPostType[];
  const posts = rawPosts?.map((post: dbPostType) => serializePost(post));
  const user = await getAuthUser();
  if (!user) return null;
  return (
    <section className="flex flex-col gap-y-5 max-w-7xl mx-auto">
      <div className="flex justify-end w-[75%] mx-auto">
        <PostButton label="Add Post" variant="submit" />
      </div>
      {!posts || posts.length == 0 ? (
        <div className="flex justify-center items-center mt-5">
          <p>No posts Found</p>
        </div>
      ) : (
        posts
          .filter((p): p is PostType => p !== undefined)
          .map((post) => (
            <PostCard key={post._id} post={post} userId={user.userId} />
          ))
      )}
    </section>
  );
}
