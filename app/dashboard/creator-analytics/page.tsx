import { AuthProvider } from "@/app/auth/AuthProvider";
import AnalyticsPage from "@/components/db-analytics";
import { config } from "@/config/base";
import { toUser } from "@/hooks/user";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";

export default async function Analytics() {
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
      <AnalyticsPage />
    </AuthProvider>
  );
}
