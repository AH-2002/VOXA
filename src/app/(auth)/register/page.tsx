"use client";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>

        <form action={action} className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1 flex flex-col w-full">
              <label
                htmlFor="first_name"
                className="mb-1 text-gray-700 font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
              {state?.errors?.first_name?.map((err, idx) => (
                <p key={idx} className="text-red-500 text-sm mt-1">
                  {err}
                </p>
              ))}
            </div>

            <div className="flex-1 flex flex-col w-full">
              <label
                htmlFor="last_name"
                className="mb-1 text-gray-700 font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
              {state?.errors?.first_name?.map((err, idx) => (
                <p key={idx} className="text-red-500 text-sm mt-1">
                  {err}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              defaultValue={String(state?.email ?? "")}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              defaultValue={String(state?.password ?? "")}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            {state?.errors?.password && (
              <div className="text-red-500 text-sm mt-1">
                <p>Password must:</p>
                <ul className="list-disc list-inside ml-4">
                  {state.errors.password.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-1 text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              defaultValue={String(state?.confirmPassword ?? "")}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            {state?.errors?.confirmPassword?.map((err, idx) => (
              <p key={idx} className="text-red-500 text-sm mt-1">
                {err}
              </p>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto bg-blue-500 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
            >
              {isPending ? "Loading..." : "Register"}
            </Button>
            <Link
              href="/login"
              className="text-blue-500 hover:underline text-sm md:text-base text-center"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
