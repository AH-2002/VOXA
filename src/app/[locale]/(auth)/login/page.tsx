"use client";
import { login } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 dark:bg-zinc-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 dark:bg-zinc-800">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-200">
          Login to Your Account
        </h1>

        <form action={action} className="space-y-5">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-gray-700 font-medium dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              defaultValue={String(state?.email ?? "")}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition dark:bg-zinc-800 dark:text-gray-200 dark:placeholder:text-gray-400 dark:border-zinc-700"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                {state.errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="mb-1 text-gray-700 font-medium dark:text-gray-200"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="border border-gray-300 rounded-md px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition dark:bg-zinc-800 dark:text-gray-200 dark:placeholder:text-gray-400 dark:border-zinc-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[2.3rem] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            {state?.errors?.password && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                {state.errors.password}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto bg-blue-500 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {isPending ? "Loading..." : "Login"}
            </Button>
            <Link
              href="/register"
              className="text-blue-500 hover:underline text-sm md:text-base text-center dark:text-blue-400"
            >
              Don’t have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
