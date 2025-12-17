"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import DiaryForm from "./diaries-form";
import { createDiary, updateDiary } from "@/actions/diaries";

export default function DiariesButton({
  diary,
  label,
  variant,
}: {
  diary?: any;
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
      <Button
        variant={variant}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        {label.includes("Add") ? <PlusCircle className="w-5 h-5" /> : null}
        {label}
      </Button>

      {open && (label.includes("Add") || label.includes("Update")) && (
        <DiaryForm
          handler={
            label.includes("Add")
              ? createDiary
              : label.includes("Update")
              ? updateDiary
              : null
          }
          diary={diary || null}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
