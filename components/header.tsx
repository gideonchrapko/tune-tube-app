"use client";

import { useAuth } from "@/app/auth/AuthContext";
import { getFirebaseAuth } from "@/app/auth/firebase";
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
import { useLoadingCallback } from "react-loading-hook";
import { logout } from "@/api";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const [initials, setInitials] = useState<string | undefined>();

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
    (route: string) => {
      return () => router.push(`/${route}`);
    },
    [router],
  );

  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    await logout();

    router.refresh();
    // setHasLoggedOut(true);
  });

  return (
    <div className="fixed top-0 right-0 z-50 w-full text-right bg-white shadow h-20 py-2 px-5 flex items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <Link href="/">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tune-tube-app-next.appspot.com/o/Black%20Logo.png?alt=media&token=72e35119-916e-45e8-bccd-06b2abad932d"
          alt="Logo"
          className="logo"
          width={50}
          height={50}
          priority
        />
      </Link>

      {user !== null ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="relative min-w-[125px] pr-7 md:my-auto h-14 rounded-full ml-auto"
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
            <DropdownMenuItem onClick={navigate("dashboard")}>
              <p className="font-semibold">Dashboard</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={navigate("dashboard/creator-analytics")}>
              <p className="font-light">Creator Analytics</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={navigate("dashboard/sounds")}>
              <p className="font-light">Sounds</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={navigate("dashboard/sync")}>
              <p className="font-light">Sync</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={navigate("dashboard/settings")}>
              <p className="font-light">Settings</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/login" className="ml-auto">
            <Button
              variant="outline"
              className="relative min-w-[125px] max-md:mx-auto md:my-auto h-14 rounded-full"
            >
              <p className="font-bold">Login</p>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
