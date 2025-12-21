"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import DiaryForm from "./diaries-form";
import { createDiary, updateDiary } from "@/actions/diaries";
import { useTranslations } from "next-intl";

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
  const postTranslation = useTranslations("post");
  return (
    <>
      <Button
        variant={variant}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        {label.includes(postTranslation("Add")) ? (
          <PlusCircle className="w-5 h-5" />
        ) : null}
        {label}
      </Button>

      {open &&
        (label.includes(postTranslation("Add")) ||
          label.includes(postTranslation("Update"))) && (
          <DiaryForm
            handler={
              label.includes(postTranslation("Add"))
                ? createDiary
                : label.includes(postTranslation("Update"))
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
