import {
  Auth,
  AuthError,
  AuthProvider,
  UserCredential,
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const CREDENTIAL_ALREADY_IN_USE_ERROR = "auth/credential-already-in-use";
export const isCredentialAlreadyInUseError = (e: AuthError) =>
  e?.code === CREDENTIAL_ALREADY_IN_USE_ERROR;

export const logout = async (auth: Auth): Promise<void> => {
  return signOut(auth);
};

export const getGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  provider.setCustomParameters({
    display: "popup",
  });

  return provider;
};

export async function loginWithProvider(
  auth: Auth,
  provider: AuthProvider,
): Promise<UserCredential> {
  const result = await signInWithPopup(
    auth,
    provider,
    browserPopupRedirectResolver,
  );

  return result;
}

export const loginWithProviderUsingRedirect = async (
  auth: Auth,
  provider: AuthProvider,
): Promise<void> => {
  await signInWithRedirect(auth, provider);
};
