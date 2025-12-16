import { UserType } from "@/app/users/types";
import { User } from "lucide-react";
import Link from "next/link";

export default function UserCard({ user }: { user: UserType }) {
  return (
    <Link href={`/profile/${user._id}`}>
      <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold shadow-inner overflow-hidden dark:bg-gray-600 dark:text-blue-300 dark:shadow-none">
          <img
            src={user.profile_picture || "/user-picture.webp"}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-full h-full object-cover"
          />{" "}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate dark:text-gray-200">
            {user.first_name} {user.last_name}
          </h3>

          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1 dark:text-gray-400">
            <User
              size={16}
              className="text-gray-400 flex-shrink-0 dark:text-gray-400"
            />
            <span className="truncate max-w-full block">{user.email}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
