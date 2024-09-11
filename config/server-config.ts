export const serverConfig = {
  useSecureCookies: process.env.USE_SECURE_COOKIES === "true",
  firebaseApiKey: process.env.NEXT_PUBLIC_API_KEY!,
  serviceAccount: {
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n",
    ) as string,
  },
};

export const authConfig = {
  apiKey: serverConfig.firebaseApiKey,
  cookieName: "AuthToken",
  cookieSignatureKeys: [
    process.env.COOKIE_SECRET_CURRENT!,
    process.env.COOKIE_SECRET_PREVIOUS!,
  ],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
    sameSite: "lax" as const,
    maxAge: 12 * 60 * 60 * 24, // twelve days
  },
  serviceAccount: serverConfig.serviceAccount,
  // Set to false in Firebase Hosting environment due to https://stackoverflow.com/questions/44929653/firebase-cloud-function-wont-store-cookie-named-other-than-session
  enableMultipleCookies: true,
};
