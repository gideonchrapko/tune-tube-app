"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getGoogleProvider, loginWithProvider } from "@/app/login/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { UserCredential } from "firebase/auth";
import { loginWithCredential } from "@/api";
import { useRedirectParam } from "@/hooks/useRedirectParam";
import { useRedirectAfterLogin } from "@/hooks/userRedirectAfterLogin";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getFirebaseAuth } from "../auth/firebase";
import { createUserProfile } from "@/config/queries";

export default function LoginPage() {
  const router = useRouter();
  const [hasLogged, setHasLogged] = React.useState(false);
  const redirect = useRedirectParam();
  const redirectAfterLogin = useRedirectAfterLogin();

  async function handleLogin(credential: UserCredential) {
    await loginWithCredential(credential);
    createUserProfile();
  }

  const [handleLoginWithGoogle, isGoogleLoading] = useLoadingCallback(
    async () => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      await handleLogin(await loginWithProvider(auth, getGoogleProvider()));

      redirectAfterLogin();
    },
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8 text-gray-800">Login.</h1>
        {hasLogged ? (
          <div className="flex items-center mb-6 gap-4">
            <span>
              Redirecting to <strong>{redirect || "/"}</strong>
            </span>
            <Loader2 />
          </div>
        ) : (
          <Button
            onClick={handleLoginWithGoogle}
            className="rounded-full font-bold text-xl hover:scale-110 transition-all p-6"
            variant="outline"
          >
            Sign in with Google
            <FaGoogle className="ml-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
