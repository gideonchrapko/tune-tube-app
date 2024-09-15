import { getTokens } from "next-firebase-auth-edge";
import { authConfig } from "@/config/server-config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { refreshNextResponseCookies } from "next-firebase-auth-edge/lib/next/cookies";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(request: NextRequest) {
  const { address } = await request.json();
  const tokens = await getTokens(cookies(), authConfig);
  const db = getFirestore(getFirebaseAdminApp());

  if (!tokens) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 },
    );
  }

  try {
    const userId = tokens.decodedToken.user_id;
    const userRef = db.collection("users").doc(userId);
    userRef.update({
      address,
    });

    const response = NextResponse.json({
      message: "Address updated successfully",
      address,
    });

    await refreshNextResponseCookies(request, response, authConfig);
    revalidatePath("/dashboard/settings");

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 },
    );
  }
}
