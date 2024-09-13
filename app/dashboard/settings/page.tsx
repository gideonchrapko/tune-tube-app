import { AuthProvider } from "@/app/auth/AuthProvider";
import SettingsPage from "@/components/db-settings";
import { authConfig } from "@/config/server-config";
import { toUser } from "@/hooks/user";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";

export default async function Settings() {
  try {
    const tokens = await getTokens(cookies(), authConfig);

    const user = tokens ? toUser(tokens) : null;

    return (
      <AuthProvider user={user}>
        <SettingsPage />
      </AuthProvider>
    );
  } catch (error) {
    console.error("Error retrieving tokens or user:", error);
    return <p>Failed to load settings page. Please try again later.</p>;
  }
}
