"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import BlogForm from "./blogForm";
import { createPost, updatePost } from "@/actions/posts";

export default function PostButton({
  post,
  label,
  variant,
}: {
  post?: any;
  label: string;
  variant?:
    | "link"
    | "submit"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {label.includes("Add") ? (
        <Button
          variant={variant}
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          {label}
        </Button>
      ) : (
        <button
          className="w-full flex gap-x-5 text-left px-5 py-2 hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          {label}
        </button>
      )}
      {open && (label.includes("Add") || label.includes("Update")) && (
        <BlogForm
          handler={
            label.includes("Add")
              ? createPost
              : label.includes("Update")
              ? updatePost
              : null
          }
          post={post || null}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
