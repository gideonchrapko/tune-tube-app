"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getGoogleProvider, loginWithProvider } from "@/app/login/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { UserCredential } from "firebase/auth";
import { loginWithCredential } from "@/api";
import { useRedirectParam } from "@/hooks/useRedirectParam";
import { useRedirectAfterLogin } from "@/hooks/userRedirectAfterLogin";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirebaseAuth } from "../auth/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [hasLogged, setHasLogged] = React.useState(false);
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const redirect = useRedirectParam();
  const redirectAfterLogin = useRedirectAfterLogin();
  const { getFirebaseAuth } = useFirebaseAuth();

  async function handleLogin(credential: UserCredential) {
    await loginWithCredential(credential);
    redirectAfterLogin();
  }

  const [handleLoginWithGoogle, isGoogleLoading] = useLoadingCallback(
    async () => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      await handleLogin(await loginWithProvider(auth, getGoogleProvider(auth)));

      router.push(redirect ?? "/");
    },
  );

  return (
    <div className="mt-20">
      <h1>{hasLogged && "Logged In"}</h1>
      <h1>{hasLoggedOut && "Logged out"}</h1>

      {hasLogged && (
        <div>
          <span>
            Redirecting to <strong>{redirect || "/"}</strong>
          </span>
          <Loader2 />
        </div>
      )}
      <Button onClick={handleLoginWithGoogle}>Sign in with Google</Button>
    </div>
  );
}
