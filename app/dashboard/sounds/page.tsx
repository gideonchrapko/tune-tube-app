import { AuthProvider } from "@/app/auth/AuthProvider";
import { config } from "@/config/base";
import { toUser } from "@/hooks/user";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";

export default async function Sounds() {
  const tokens = await getTokens(cookies(), {
    apiKey: config.firebase.apiKey!,
    cookieName: "AuthToken",
    cookieSignatureKeys: config.server.cookieSignatureKeys,
    serviceAccount: config.server.serviceAccount,
    headers: headers(),
  });

  const user = tokens ? toUser(tokens) : null;

  return (
    <AuthProvider user={user}>
      <div className="bg-gray-100 h-full pt-24">
        <div className="flex items-center h-[105px] px-8 py-6">
          <p className="font-bold text-black text-6xl">Sounds</p>
        </div>
      </div>
    </AuthProvider>
  );
}
