import { AuthProvider } from "@/app/auth/AuthProvider";
import { getFirebaseAdminApp } from "@/app/firebase";
import DbSoundsPage from "@/components/db-sounds";
import { authConfig } from "@/config/server-config";
import { toUser } from "@/hooks/user";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

export default async function Sounds() {
  try {
    const tokens = await getTokens(cookies(), authConfig);
    const user = tokens ? toUser(tokens) : null;
    const db = getFirestore(getFirebaseAdminApp());
    const collectionRef = db.collection("sounds");
    const snapshot = await collectionRef.get();
    const soundsFirebase = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return (
      <AuthProvider user={user}>
        <DbSoundsPage soundsFirebase={soundsFirebase} />
      </AuthProvider>
    );
  } catch (error) {
    console.error("Error retrieving tokens or user:", error);
    return <p>Failed to load sounds page. Please try again later.</p>;
  }
}
