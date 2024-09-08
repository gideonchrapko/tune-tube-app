import { Claims } from "next-firebase-auth-edge/lib/auth/claims";

export interface UserLogin {
  email: string | null;
  displayName: string;
  photoURL: string | null;
  uid: string;
  phoneNumber: string | null;
  emailVerified: boolean | false;
  customClaims: Claims;
}

export interface UserFirebase {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  uid: string | null;
  phoneNumber: string | null;
  emailVerified: boolean | null;
  isAnonymous: boolean | null;
  getIdToken: () => void;
}

export interface FirebaseToken {
  token: string | null;
}
