import { getTokens } from "next-firebase-auth-edge";
import { authConfig } from "@/config/server-config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { refreshNextResponseCookies } from "next-firebase-auth-edge/lib/next/cookies";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

export async function POST(request: NextRequest) {
  const { dob } = await request.json();
  const tokens = await getTokens(cookies(), authConfig);
  const db = getFirestore(getFirebaseAdminApp());
  const auth = getAuth(getFirebaseAdminApp());

  if (!tokens) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 },
    );
  }

  try {
    const uid = tokens.decodedToken.uid;
    const userRef = db.collection("users").doc(uid);
    await userRef.update({
      dob,
    });

    await auth.setCustomUserClaims(uid, { dob });

    const response = NextResponse.json({
      message: "Date of birth updated successfully",
      dob,
    });

    await refreshNextResponseCookies(request, response, authConfig);
    revalidatePath("/dashboard/settings");

    return response;
  } catch (error) {
    console.error("Error updating date of birth:", error);
    return NextResponse.json(
      { error: "Failed to update date of birth" },
      { status: 500 },
    );
  }
}
