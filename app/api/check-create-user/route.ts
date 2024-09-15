import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { authConfig } from "@/config/server-config";

export async function POST() {
  const tokens = await getTokens(cookies(), authConfig);
  const db = getFirestore(getFirebaseAdminApp());

  if (!tokens) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 },
    );
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(tokens.token);
    const uid = decodedToken.uid;
    const userDoc = await db.collection("users").doc(uid).get();
    const createUser = !userDoc.exists;

    if (createUser) {
      try {
        const userData = {
          uid: uid,
          email: decodedToken.email || null,
          displayName: decodedToken.name || null,
          photoURL: decodedToken.picture || null,
          emailVerified: decodedToken.email_verified || false,
          phoneNumber: decodedToken.phone_number || null,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };

        await db.collection("users").doc(uid).set(userData, { merge: true });

        return NextResponse.json({ success: true, user: userData });
      } catch (error) {
        return NextResponse.json({ success: false, error: error });
      }
    } else {
      console.log("user exists");
    }

    return NextResponse.json({ success: true, uid: uid });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ success: false, error: error });
  }
}
