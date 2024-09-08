"use client";

import { useAuth } from "@/app/auth/AuthContext";
import { useFirebaseAuth } from "@/app/auth/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Image from "next/image";

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

  const navigate = useCallback(() => {
    return () => router.push("/dashboard");
  }, [router]);

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
      {user !== null ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="relative min-w-[125px] pr-7 max-md:mx-auto md:my-auto h-14 rounded-full"
            >
              {user?.photoURL && (
                <Image
                  src={user.photoURL}
                  alt="google photo"
                  width={35}
                  height={35}
                  className="mx-auto rounded-full absolute left-[10px]"
                />
              )}
              <h4 className="ml-auto text-lg">{initials}</h4>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-lg">
            <DropdownMenuLabel>
              <p className="font-bold">{user?.displayName}</p>
              <p className="font-light text-xs">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={navigate()}>Dashboard</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/login">
            <Button
              variant="outline"
              className="relative min-w-[125px] max-md:mx-auto md:my-auto h-14 rounded-full"
            >
              Login
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
