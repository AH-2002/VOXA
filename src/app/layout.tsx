import "./globals.css";
import Footer from "@/app/shared/ui/footer/footer";
import getAuthUser from "@/lib/getAuthUser";
import Navbar from "./shared/ui/navbar/navbar";
import { ThemeProvider } from "next-themes";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAuth = await getAuthUser();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-900 dark:text-white text-black">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header>
            <Navbar userId={userAuth?.userId} />
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
