import { AuthProvider } from "@/app/auth/AuthProvider";
import AnalyticsPage from "@/components/db-analytics";
import DashboardHome from "@/components/db-home";
import { config } from "@/config/base";
import { toUser } from "@/hooks/user";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";

export default async function Dashboard() {
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
      <DashboardHome />
    </AuthProvider>
  );
}
