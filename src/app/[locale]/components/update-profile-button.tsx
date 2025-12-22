"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import UpdateProfileForm from "./update-profile-form";
import { Button } from "./ui/button";
import { UserType } from "../users/types";
import { useTranslations } from "next-intl";

export default function UpdateProfileButton({ user }: { user: UserType }) {
  const postTranslation = useTranslations("profile");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Pencil size={18} />
        {postTranslation("updateProfile")}
      </Button>
      {open && <UpdateProfileForm user={user} onClose={() => setOpen(false)} />}
    </>
  );
}
