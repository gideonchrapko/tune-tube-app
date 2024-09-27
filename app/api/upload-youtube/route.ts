import { getTokens } from "next-firebase-auth-edge";
import { authConfig } from "@/config/server-config";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const tokens = await getTokens(cookies(), authConfig);

  if (!tokens) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 },
    );
  }

  // console.log(tokens.customToken);

  try {
    const uid = tokens.decodedToken.uid;

    const formData = new FormData();
    formData.append("uid", uid);
    formData.append(
      "request",
      JSON.stringify({
        title: "My YouTube Short",
        description: "Description here",
        tags: ["shorts", "tag1", "tag2"],
        volumes_db: [-24, -23, -22],
      }),
    );

    // Read files from the public directory
    const videoPath = path.join(
      process.cwd(),
      "public",
      "add-blur-from-nav.mp4",
    );
    const audioPath = path.join(process.cwd(), "public", "SONG.m4a");

    const videoFile = new File(
      [fs.readFileSync(videoPath)],
      "add-blur-from-nav.mp4",
      { type: "video/mp4" },
    );
    const audioFile = new File([fs.readFileSync(audioPath)], "SONG.m4a", {
      type: "audio/m4a",
    });

    formData.append("audio", audioFile);
    formData.append("video", videoFile);

    formData.append("audio", audioFile);
    formData.append("video", videoFile);

    const response = await fetch("http://localhost:8000/upload-youtube/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
      body: formData,
    });

    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
