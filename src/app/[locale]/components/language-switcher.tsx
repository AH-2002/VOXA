"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "./ui/button";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";

    // remove current locale from path
    const segments = pathname.split("/");
    segments[1] = newLocale;

    router.push(segments.join("/"));
  };

  return (
    <Button variant="outline" size="sm" onClick={switchLanguage}>
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
}
