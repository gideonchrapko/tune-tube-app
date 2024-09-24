import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { authConfig } from "@/config/server-config";

export async function POST() {
  const tokens = await getTokens(cookies(), authConfig);
  const auth = getAuth(getFirebaseAdminApp());
  const db = getFirestore(getFirebaseAdminApp());

  if (!tokens) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 },
    );
  }

  const decodedToken = await getAuth().verifyIdToken(tokens.token);
  const uid = decodedToken.uid;

  try {
    await auth.deleteUser(uid);

    await db.collection("users").doc(uid).delete();
    console.log(`Successfully deleted user ${tokens.decodedToken.displayName}`);
    return NextResponse.json(
      `Deleted Firestore data for user ${tokens.decodedToken.displayName}`,
    );
  } catch (error) {
    console.error("Error deleting user", error);
    return NextResponse.json({ success: false, error: error });
  }
}
