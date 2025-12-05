import { dbPostType } from "@/app/shared/types/posts";
import PostCard from "@/app/shared/ui/cards/post-card";
import ProfileInfoCard from "@/app/shared/ui/cards/profile-info";
import { dbUserType } from "@/app/users/types";
import PostButton from "@/components/post-buttons";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { serializePost, serializeUser } from "@/lib/serialize";
import { ObjectId } from "mongodb";
type Params = {
  params: { id: string };
};
export default async function ProfilePage(props: Params) {
  const { params } = await props;
  const { id } = await params;
  const usersCollection = await getCollection("users");
  const rawUser = (await usersCollection?.findOne({
    _id: new ObjectId(id),
  })) as dbUserType;

  if (!rawUser) return <p>User not found</p>;
  const user = serializeUser(rawUser);
  const postsCollection = await getCollection("posts");
  const rawPosts = (await postsCollection
    ?.find({ userId: id })
    .sort({ $natural: -1 })
    .toArray()) as dbPostType[];
  const posts = rawPosts.map(serializePost);
  const authUser = await getAuthUser();
  const loggedIn = id === authUser?.userId;

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center mb-10">
        <img
          src={user?.profile_picture || "/user-picture.webp"}
          alt="Profile Picture"
          className=" w-70 h-70 rounded-full object-cover bg-transparent"
        />
      </div>

      {user && <ProfileInfoCard user={user} loggedIn={loggedIn} />}
      <div className="flex justify-between w-[75%] mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Posts</h3>
        <PostButton label="Add Post" variant="submit" />
      </div>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map(
            (post) =>
              post && (
                <PostCard
                  key={post?._id}
                  post={post}
                  userId={user?._id ?? ""}
                />
              )
          )
        ) : (
          <div className="flex justify-center items-center mt-5">
            <p className="text-gray-500">
              This user hasn’t posted anything yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
