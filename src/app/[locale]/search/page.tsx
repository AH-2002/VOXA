import { getCollection } from "@/lib/db";
import { dbUserType, UserType } from "../users/types";
import { serializeUser } from "@/lib/serialize";
import UserCard from "../shared/ui/cards/user-card";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { q?: string };
}) {
  const locale = (await params).locale;
  const messages = (await import(`../../../../locales/${locale}/default.json`))
    .default;
  let users: any;
  const resolvedParams = await searchParams;
  const q = (await resolvedParams.q) || "";
  if (q.trim().length > 0) {
    const userCollection = await getCollection("users");
    const rawUsers = (await userCollection
      ?.find({
        $or: [
          { first_name: { $regex: q, $options: "i" } },
          { last_name: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
        ],
      })
      .toArray()) as dbUserType[];
    users = rawUsers?.map((user: dbUserType) => serializeUser(user));
  }
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {messages.users.explore}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users?.map((user: UserType) => (
          <UserCard key={user?._id.toString()} user={user} />
        ))}
      </div>
    </section>
  );
}
