import { AuthProvider } from "@/app/auth/AuthProvider";
import SyncPage from "@/components/db-sync";
import { config } from "@/config/base";
import { toUser } from "@/hooks/user";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";

export default async function Sync() {
  try {
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
        <SyncPage />
      </AuthProvider>
    );
  } catch (error) {
    console.error("Error retrieving tokens or user:", error);
    return <p>Failed to load sync page. Please try again later.</p>;
  }
}
