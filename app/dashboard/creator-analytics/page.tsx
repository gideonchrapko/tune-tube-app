import { AuthProvider } from "@/app/auth/AuthProvider";
import { getFirebaseAdminApp } from "@/app/firebase";
import AnalyticsPage from "@/components/db-analytics";
import { authConfig } from "@/config/server-config";
import { toUser } from "@/hooks/user";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

export default async function Analytics() {
  try {
    const tokens = await getTokens(cookies(), authConfig);
    const user = tokens ? toUser(tokens) : null;
    const targetEmail = user?.email;
    const db = getFirestore(getFirebaseAdminApp());
    const collectionRef = db.collection("analytics");
    const querySnapshot = await collectionRef
      .where("email", "==", targetEmail)
      .get();
    const analyticsData = querySnapshot.empty
      ? null
      : querySnapshot.docs[0].data();

    return (
      <AuthProvider user={user}>
        <AnalyticsPage analyticsData={analyticsData} />
      </AuthProvider>
    );
  } catch (error) {
    console.error("Error retrieving tokens or user:", error);
    return <p>Failed to load analytics page. Please try again later.</p>;
  }
}
