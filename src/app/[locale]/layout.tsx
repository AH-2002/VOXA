import "./globals.css";
import getAuthUser from "@/lib/getAuthUser";
import Navbar from "./shared/ui/navbar/navbar";
import { ThemeProvider } from "next-themes";
import Footer from "./shared/ui/footer/footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "../../../i18n/routing";
import { notFound } from "next/navigation";
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const userAuth = await getAuthUser();
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = (await import(`../../../locales/${locale}/default.json`))
    .default;
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-900 dark:text-white text-black">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <header>
              <Navbar userId={userAuth?.userId} />
            </header>
            <main className="flex-1">{children}</main>
            <Footer messages={messages} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
