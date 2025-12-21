"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { PostType } from "../shared/types/posts";
import { FormState } from "../shared/types/forms";

export default function BlogForm({
  handler,
  post,
  onClose,
}: {
  handler: any;
  post?: PostType;
  onClose: () => void;
}) {
  const [state, action, isPending] = useActionState<FormState>(
    handler,
    undefined
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-gray-900/70"
      />

      <form
        action={action}
        className="relative z-50 w-[90%] max-w-lg bg-white shadow-2xl rounded-xl p-6 space-y-6 animate-fadeIn dark:bg-gray-800"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4 dark:text-gray-200">
          {post ? "Update Post" : "Create Post"}
        </h1>

        <input
          type="hidden"
          name="postId"
          defaultValue={post?._id?.toString()}
        />

        <div className="flex flex-col">
          <label
            htmlFor="content"
            className="mb-2 text-gray-700 font-medium dark:text-gray-300"
          >
            Content
          </label>
          <textarea
            name="content"
            placeholder="Share yout thoughts..."
            rows={6}
            defaultValue={state?.content || post?.content}
            className="border border-gray-300 rounded-md px-4 py-2 resize-none 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-600"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                (e.currentTarget.form as HTMLFormElement)?.requestSubmit();
              }
            }}
          />
          {state?.errors?.content && (
            <p className="text-red-500 mt-1 text-sm dark:text-red-400">
              {state.errors.content}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium dark:text-gray-300">
            Add Photo / Video
          </label>
          <input
            type="file"
            name="media"
            accept="image/*,video/*"
            className="border border-gray-300 rounded-md px-3 py-2 
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 cursor-pointer"
          />
          {state?.errors?.media && (
            <p className="text-red-500 mt-1 text-sm dark:text-red-400">
              {state.errors.media}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white font-medium px-6 py-2 rounded-md 
              shadow hover:bg-blue-600 focus:outline-none focus:ring-2 
              focus:ring-blue-400 transition disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
