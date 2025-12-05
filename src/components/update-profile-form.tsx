"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { updateProfile } from "@/actions/profile";
import { UserType } from "@/app/users/types";

export default function UpdateProfileForm({
  user,
  onClose,
}: {
  user: UserType;
  onClose: () => void;
}) {
  const [state, action, isPending] = useActionState(updateProfile, undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <form
        action={action}
        className="relative z-50 w-[90%] max-w-lg bg-white shadow-2xl rounded-xl p-6 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Update Profile
        </h1>

        <div className="flex flex-col">
          <input type="hidden" name="userId" value={user?._id?.toString()} />
          <label className="mb-2 text-gray-700 font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            defaultValue={state?.first_name || user?.first_name}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.first_name?.map((err, idx) => (
            <p key={idx} className="text-red-500 text-sm mt-1">
              {err}
            </p>
          ))}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Last Name</label>
          <input
            type="text"
            name="last_name"
            defaultValue={state?.last_name || user?.last_name}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.last_name?.map((err, idx) => (
            <p key={idx} className="text-red-500 text-sm mt-1">
              {err}
            </p>
          ))}
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="Email"
            defaultValue={user?.email}
            disabled
            className="border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed disabled:opacity-70 disabled:bg-gray-100 disabled:text-gray-500"
            title="Email can't be updated"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.password?.map((err, idx) => (
            <p key={idx} className="text-red-500 text-sm mt-1">
              {err}
            </p>
          ))}
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Retype password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.confirmPassword?.map((err, idx) => (
            <p key={idx} className="text-red-500 text-sm mt-1">
              {err}
            </p>
          ))}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">
            Profile Picture
          </label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} variant="submit">
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
