import { getTokens } from "next-firebase-auth-edge";
import { authConfig } from "@/config/server-config";
import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getFirestore } from "firebase-admin/firestore";

import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const tokens = await getTokens(cookies(), authConfig);
  const db = getFirestore(getFirebaseAdminApp());

  if (!tokens) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 },
    );
  }

  try {
    const uid = tokens.decodedToken.uid;

    // Call your FastAPI script
    const response = await fetch("http://localhost:8000/upload-youtube/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${uid}`,
      },
      body: JSON.stringify({ uid }),
    });

    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
