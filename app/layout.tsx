import type { Metadata } from "next";
import { Inter, Pacifico, Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/utils/ReactQueryProvider";
import Header from "@/components/header";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";
import { toUser } from "@/hooks/user";
import { config } from "@/config/base";
import { AuthProvider } from "./auth/AuthProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
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
  const tokens = await getTokens(cookies(), {
    apiKey: config.firebase.apiKey!,
    cookieName: "AuthToken",
    cookieSignatureKeys: config.server.cookieSignatureKeys,
    serviceAccount: config.server.serviceAccount,
    headers: headers(),
  });

  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${pacifico.className} ${poppins.className}`}
      >
        <ReactQueryProvider>
          <Suspense>
            <AuthProvider user={user}>
              <Header />
            </AuthProvider>
          </Suspense>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
