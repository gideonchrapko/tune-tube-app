export const config = {
  accountId: process.env.NEXT_PUBLIC_ACCOUNT_ID,
  //   redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL as string,
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID!,
  },
  server: {
    serviceAccount: {
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n",
      ) as string,
    },
    cookieSignatureKeys: [
      process.env.COOKIE_SECRET_CURRENT!,
      process.env.COOKIE_SECRET_PREVIOUS!,
    ],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24,
    },
  },
};