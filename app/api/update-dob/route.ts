import { getTokens } from "next-firebase-auth-edge";
import { authConfig } from "@/config/server-config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { refreshNextResponseCookies } from "next-firebase-auth-edge/lib/next/cookies";
import { updateCustomClaimsDOB, updateDOBDB } from "@/lib/admin";

export async function POST(request: NextRequest) {
  const { dob } = await request.json();
  const tokens = await getTokens(cookies(), authConfig);

  if (!tokens) {
    return NextResponse.json(
      { error: "Unauthenticated user" },
      { status: 401 },
    );
  }

  try {
    const uid = tokens.decodedToken.uid;
    await updateDOBDB(uid, dob);
    await updateCustomClaimsDOB(uid, dob);

    const response = NextResponse.json({
      message: "Date of birth updated successfully",
      dob,
    });

    await refreshNextResponseCookies(request, response, authConfig);
    revalidatePath("/dashboard/settings");
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update date of birth" },
      { status: 500 },
    );
  }
}
