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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8 text-gray-800">Login.</h1>
        <Button
          onClick={handleLoginWithGoogle}
          className="rounded-full font-bold text-xl hover:scale-110 transition-all p-5"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
