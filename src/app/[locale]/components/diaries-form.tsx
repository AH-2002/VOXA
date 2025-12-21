"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { dbDiariesType } from "../diaries/types";
import { FormState } from "../shared/types/forms";

export default function DiaryForm({
  handler,
  diary,
  onClose,
}: {
  handler: any;
  diary: dbDiariesType;
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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <form
        action={action}
        className="relative z-50 w-[90%] max-w-lg bg-white shadow-2xl rounded-xl p-6 space-y-6 animate-fadeIn dark:bg-zinc-800 dark:text-gray-200"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4 dark:text-gray-200">
          Add your diaries here
        </h1>

        <input
          type="hidden"
          name="diaryId"
          defaultValue={diary?._id?.toString()}
        />

        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 text-gray-700 font-medium dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={state?.title || diary?.title}
            className="border border-gray-300 rounded-md px-4 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition dark:bg-zinc-800 dark:text-gray-200 dark:border-zinc-700"
          />
          {state?.errors?.title && (
            <p className="text-red-500 mt-1 text-sm dark:text-red-400">{state.errors.title}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="mb-2 text-gray-700 font-medium dark:text-gray-200">
            Content
          </label>
          <textarea
            name="content"
            rows={6}
            defaultValue={state?.content || diary?.content}
            className="border border-gray-300 rounded-md px-4 py-2 resize-none 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition dark:bg-zinc-800 dark:text-gray-200 dark:border-zinc-700"
          />
          {state?.errors?.content && (
            <p className="text-red-500 mt-1 text-sm">{state.errors.content}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 text-white font-medium px-6 py-2 rounded-md 
              shadow hover:bg-blue-600 focus:outline-none focus:ring-2 
              focus:ring-blue-400 transition disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
