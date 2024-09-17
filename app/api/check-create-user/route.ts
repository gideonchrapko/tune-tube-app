import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { authConfig } from "@/config/server-config";
import * as admin from "firebase-admin";

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

  function removeUndefined(obj: any): any {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined),
    );
  }

  try {
    const decodedToken = await auth.verifyIdToken(tokens.token);
    const uid = decodedToken.uid;

    const getExistingUser = async () => {
      try {
        // First, try to get the user from Firebase Authentication
        const userRecord = await auth.getUser(uid);

        // If user exists in Authentication, update Firestore if necessary
        const userDoc = await db.collection("users").doc(uid).get();
        if (!userDoc.exists) {
          await db
            .collection("users")
            .doc(uid)
            .set(
              removeUndefined({
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
                photoURL: userRecord.photoURL,
                emailVerified: userRecord.emailVerified,
                phoneNumber: userRecord.phoneNumber,
                createdAt: new Date().toISOString(),
              }),
            );
        }

        return userRecord;
      } catch (error) {
        // If user doesn't exist in Authentication, create a new one
        if (error === "auth/user-not-found") {
          const userProperties: admin.auth.CreateRequest = {
            uid: uid,
            email: decodedToken.email || undefined,
            displayName: decodedToken.name || undefined,
            photoURL: decodedToken.picture || undefined,
            emailVerified: decodedToken.email_verified || false,
            phoneNumber: decodedToken.phone_number || undefined,
          };

          const newUser = await auth.createUser(userProperties);
          await db
            .collection("users")
            .doc(uid)
            .set(
              removeUndefined({
                ...userProperties,
                createdAt: new Date().toISOString(),
              }),
            );
          return newUser;
        } else {
          console.error("Error checking/creating user:", error);
          throw error;
        }
      }
    };

    const onSuccess = async (existingUser: admin.auth.UserRecord) => {
      const current = removeUndefined({
        uid: existingUser.uid,
        email: existingUser.email || null,
        displayName: existingUser.displayName || null,
        photoURL: existingUser.photoURL || null,
        emailVerified: existingUser.emailVerified || false,
        phoneNumber: existingUser.phoneNumber || null,
        lastLoginAt: new Date().toISOString(),
      });

      await db.collection("users").doc(uid).set(current, { merge: true });
    };

    const existingUser = await getExistingUser();
    await onSuccess(existingUser);

    return NextResponse.json({ success: true, user: existingUser });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
