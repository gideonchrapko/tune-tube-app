import { AuthProvider } from "@/app/auth/AuthProvider";
import DbSoundsPage from "@/components/db-sounds";
import { config } from "@/config/base";
import { toUser } from "@/hooks/user";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";

export default async function Sounds() {
  try {
    console.log("Retrieving tokens...");
    const tokens = await getTokens(cookies(), {
      apiKey: config.firebase.apiKey!,
      cookieName: "AuthToken",
      cookieSignatureKeys: config.server.cookieSignatureKeys,
      serviceAccount: config.server.serviceAccount,
      headers: headers(),
    });

    console.log("Tokens retrieved:", tokens);
    
    const user = tokens ? toUser(tokens) : null;
    console.log("User retrieved from tokens:", user);

    return (
      <AuthProvider user={user}>
        <DbSoundsPage />
      </AuthProvider>
    );
  } catch (error) {
    console.error("Error retrieving tokens or user:", error);
    return <p>Failed to load sounds page. Please try again later.</p>;
  }
}
