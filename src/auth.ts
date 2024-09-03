import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "../config/firebase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  providers: [
    Google({
      clientId: process.env.NEXT_GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_AUTH_CLIENT_SECRET as string,
    }),
  ],
});
