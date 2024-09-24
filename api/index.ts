import { getToken } from "@firebase/app-check";
import { getAppCheck } from "../app-check";
import { UserCredential } from "firebase/auth";
// import { AuthRequestHandler } from "@/types/auth-request-handler";
// import { createFirebaseTokenGenerator } from "@/types/token-generator";

export async function login(token: string) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  // This is optional. Use it if your app supports App Check – https://firebase.google.com/docs/app-check
  if (process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY) {
    const appCheckTokenResponse = await getToken(getAppCheck(), false);

    headers["X-Firebase-AppCheck"] = appCheckTokenResponse.token;
  }

  await fetch("/api/login", {
    method: "GET",
    headers,
  });
}

export async function loginWithCredential(credential: UserCredential) {
  const idToken = await credential.user.getIdToken();
  await login(idToken);
}

export async function logout() {
  const headers: Record<string, string> = {};

  // This is optional. Use it if your app supports App Check – https://firebase.google.com/docs/app-check
  if (process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY) {
    const appCheckTokenResponse = await getToken(getAppCheck(), false);

    headers["X-Firebase-AppCheck"] = appCheckTokenResponse.token;
  }

  await fetch("/api/logout", {
    method: "GET",
    headers,
  });
}

export async function checkEmailVerification() {
  const headers: Record<string, string> = {};

  // This is optional. Use it if your app supports App Check – https://firebase.google.com/docs/app-check
  if (process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY) {
    const appCheckTokenResponse = await getToken(getAppCheck(), false);

    headers["X-Firebase-AppCheck"] = appCheckTokenResponse.token;
  }

  await fetch("/api/check-email-verification", {
    method: "GET",
    headers,
  });
}

// const credential = options.credential ?? getApplicationDefault();
// const authRequestHandler = new AuthRequestHandler(credential, {
//   tenantId: options.tenantId,
// });
// const tokenGenerator = createFirebaseTokenGenerator(
//   credential,
//   options.tenantId,
// );

// async function updateUser(
//   uid: string,
//   properties: UpdateRequest,
// ): Promise<any> {
//   return authRequestHandler
//     .updateExistingAccount(uid, properties)
//     .then((existingUid) => getUser(existingUid))
//     .then((user) => {
//       if (!user) {
//         throw new AuthError(
//           AuthErrorCode.INTERNAL_ERROR,
//           "Could not get recently updated user from database. Most likely it was deleted.",
//         );
//       }

//       return user;
//     });
// }
