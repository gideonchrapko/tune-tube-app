import { getTokens } from "next-firebase-auth-edge";
import { authConfig } from "@/config/server-config";
import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getAuth } from "firebase-admin/auth";
import { v4 as uuidv4 } from "uuid";
import admin from "firebase-admin";

export async function POST(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 },
    );
  }

  try {
    const auth = getAuth(getFirebaseAdminApp());
    const userId = tokens.decodedToken.user_id;

    const formData = await request.formData();
    const image = formData.get("file") as File;

    if (!image) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bucket = admin
      .storage()
      .bucket(process.env.NEXT_PUBLIC_STORAGE_BUCKET!);

    const fileName = `${userId}_${image.name}`;
    const filePath = `profilePictures/${fileName}`;
    const file = bucket.file(filePath);
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    await auth.updateUser(userId, { photoURL: publicUrl });

    return NextResponse.json({
      message: "Profile picture updated successfully",
      publicUrl,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { error: "Failed to update profile picture" },
      { status: 500 },
    );
  }
}
