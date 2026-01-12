"use client";

import { useLocale } from "next-intl";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";

    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

    router.replace(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <Button variant="outline" size="sm" onClick={switchLanguage}>
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
}
