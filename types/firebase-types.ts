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

export interface BaseUpdateMultiFactorInfoRequest {
  uid?: string;
  displayName?: string;
  enrollmentTime?: string;
  factorId: string;
}

export interface UpdatePhoneMultiFactorInfoRequest
  extends BaseUpdateMultiFactorInfoRequest {
  phoneNumber: string;
}

export type UpdateMultiFactorInfoRequest = UpdatePhoneMultiFactorInfoRequest;

export interface MultiFactorUpdateSettings {
  enrolledFactors: UpdateMultiFactorInfoRequest[] | null;
}

export interface UserProvider {
  uid?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId?: string;
}

export interface UpdateRequest {
  disabled?: boolean;
  displayName?: string | null;
  email?: string;
  emailVerified?: boolean;
  password?: string;
  phoneNumber?: string | null;
  photoURL?: string | null;
  multiFactor?: MultiFactorUpdateSettings;
  providerToLink?: UserProvider;
  providersToUnlink?: string[];
  tenantId?: string;
}
