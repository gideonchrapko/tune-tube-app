import { AuthProvider } from "@/app/auth/AuthProvider";
import AnalyticsPage from "@/components/db-analytics";
import { authConfig } from "@/config/server-config";
import { toUser } from "@/hooks/user";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

export default async function Analytics() {
  const tokens = await getTokens(cookies(), authConfig);

  const user = tokens ? toUser(tokens) : null;

  return (
    <AuthProvider user={user}>
      <AnalyticsPage />
    </AuthProvider>
  );
}
