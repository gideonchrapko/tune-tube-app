import { getTokens } from "next-firebase-auth-edge";
import { authConfig } from "@/config/server-config";
import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminApp } from "@/app/firebase";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { refreshNextResponseCookies } from "next-firebase-auth-edge/lib/next/cookies";
import { revalidatePath } from "next/cache";

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
    const downloadToken = uuidv4();
    const buffer = await image.arrayBuffer();
    await file.save(Buffer.from(buffer), {
      metadata: {
        contentType: image.type,
        metadata: {
          firebaseStorageDownloadTokens: downloadToken,
        },
      },
    });
    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET!;
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
      filePath,
    )}?alt=media&token=${downloadToken}`;
    await auth.updateUser(userId, { photoURL: downloadUrl });
    const response = NextResponse.json({
      message: "Profile picture updated successfully",
      downloadUrl,
    });
    await refreshNextResponseCookies(request, response, authConfig);
    revalidatePath("/dashboard/settings");

    return response;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { error: "Failed to update profile picture" },
      { status: 500 },
    );
  }
}
