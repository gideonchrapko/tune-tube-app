"use client";

import { useAuth } from "@/app/auth/AuthContext";
import { useFirebaseAuth } from "@/app/auth/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const [initials, setInitials] = useState<string | undefined>();
  const { getFirebaseAuth } = useFirebaseAuth();

  useEffect(() => {
    const name = user?.displayName?.split(" ");
    const length = name?.length;
    if (name && length) {
      const firstInitial = name[0].charAt(0).toUpperCase();
      const secondInitial = name[length - 1].charAt(0).toUpperCase();
      setInitials(firstInitial.concat(secondInitial));
    }
  }, [user?.displayName]);

  const navigate = useCallback(
    (path?: "/settings") => {
      return () => router.push(`/dashboard${path ?? ""}`);
    },
    [router],
  );

  const handleLogout = useCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    await fetch("/api/logout", {
      method: "GET",
    });
    window.location.reload();
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50 w-full text-right">
      {user ? (
        <>
          <Link href="/login">
            <Button className="mr-2">{user?.displayName}</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </>
      )}
    </div>
  );
}
