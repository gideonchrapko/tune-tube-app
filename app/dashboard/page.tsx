import { AuthProvider } from "@/app/auth/AuthProvider";
import DashboardHome from "@/components/db-home";
import { authConfig } from "@/config/server-config";
import { toUser } from "@/hooks/user";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const tokens = await getTokens(cookies(), authConfig);

  const user = tokens ? toUser(tokens) : null;

  return (
    <AuthProvider user={user}>
      <DashboardHome />
    </AuthProvider>
  );
}
