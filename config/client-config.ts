export const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
  projectId: process.env.AUTH_FIREBASE_PROJECT_ID!,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
