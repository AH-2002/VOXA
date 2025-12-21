import { UserType } from "@/app/[locale]/users/types";
import { LineSkeleton } from "../skeletons/skeleton";
import UpdateProfileButton from "@/app/[locale]/components/update-profile-button";

export default function ProfileInfoCard({
  user,
  loggedIn,
}: {
  user: UserType;
  loggedIn: boolean;
}) {
  return (
    <div
      className="
        w-[75%] mx-auto
        bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100
        flex flex-col sm:flex-row items-center justify-between
        gap-4 sm:gap-0 text-center sm:text-left dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
      "
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {user.first_name && user.last_name ? (
            `${user.first_name} ${user.last_name}`
          ) : (
            <LineSkeleton />
          )}
        </h2>

        <p className="text-gray-600 mt-2 dark:text-gray-400">
          {user.email ? user.email : <LineSkeleton />}
        </p>
      </div>

      {user && loggedIn && (
        <div className="mt-2 sm:mt-0">
          <UpdateProfileButton user={user} />
        </div>
      )}
    </div>
  );
}
