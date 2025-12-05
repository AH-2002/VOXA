import "./globals.css";
import Footer from "@/app/shared/ui/footer/footer";
import Navbar from "./shared/ui/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <header>
          <Navbar />
        </header>

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
