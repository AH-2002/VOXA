import { getCollection } from "@/lib/db";
import UserCard from "../shared/ui/cards/user-card";
import { dbUserType } from "./types";
import { serializeUser } from "@/lib/serialize";

export default async function UsersPage() {
  const usersCollection = await getCollection("users");
  const rawUsers = (await usersCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray()) as dbUserType[];
  const users = rawUsers
    ?.map((user: dbUserType) => serializeUser(user))
    .filter((user): user is NonNullable<typeof user> => !!user);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Explore Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users?.map((user) => (
          <UserCard key={user?._id.toString()} user={user} />
        ))}
      </div>
    </section>
  );
}
