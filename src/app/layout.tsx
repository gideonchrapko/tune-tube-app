import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/utils/ReactQueryProvider";
import { auth, signOut } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tune Tube App",
  description: "A tune tube application for creators",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <p>Welcome {session?.user?.name}</p>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
