import type { Metadata } from "next";
import { Inter, Pacifico, Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/utils/ReactQueryProvider";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" }); // Pacifico only comes in 400 weight
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

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
      <body
        className={`${inter.className} ${pacifico.className} ${poppins.className}`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
