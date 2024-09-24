import { FirebaseToken } from "@/types/firebase-types";

export async function getLogin(idTokenResult: FirebaseToken) {
  try {
    await fetch("/api/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idTokenResult.token}`,
      },
    });
  } catch (error) {
    return { error: "something went wrong with the login" };
  }
}
