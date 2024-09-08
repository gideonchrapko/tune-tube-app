"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getGoogleProvider, loginWithProvider } from "@/app/login/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { getFirebaseAuth } from "@/app/auth/firebase";
import { UserCredential, signOut } from "firebase/auth";
import { loginWithCredential, logout } from "@/app/api";
import { useRedirectParam } from "@/hooks/useRedirectParam";
import { useRedirectAfterLogin } from "@/hooks/userRedirectAfterLogin";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [hasLogged, setHasLogged] = React.useState(false);
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const redirect = useRedirectParam();
  const redirectAfterLogin = useRedirectAfterLogin();

  async function handleLogin(credential: UserCredential) {
    await loginWithCredential(credential);
    redirectAfterLogin();
  }

  const [handleLoginWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      setHasLogged(false);

      const auth = getFirebaseAuth();
      await handleLogin(await loginWithProvider(auth, getGoogleProvider(auth)));

      router.push("/dashboard");

      setHasLogged(true);
    });

  //   async function handleLoginWithRedirect() {
  //     const auth = getFirebaseAuth();
  //     const credential = await getRedirectResult(auth);

  //     if (credential?.user) {
  //       await handleLogin(credential);

  //       setHasLogged(true);
  //     }
  //   }

  //   React.useEffect(() => {
  //     handleLoginWithRedirect();
  //   }, []);

  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    await logout();

    router.refresh();

    setHasLoggedOut(true);
  });

  return (
    <div className="mt-20">
      <h1>Login</h1>

      {hasLogged && (
        <div>
          <span>
            Redirecting to <strong>{redirect || "/"}</strong>
          </span>
          <Loader2 />
        </div>
      )}
      <Button onClick={handleLoginWithGoogle}>Sign in with Google</Button>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}
