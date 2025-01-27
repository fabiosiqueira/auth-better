"use client";

import { authClient } from "@/lib/auth-client";
import { AirVent } from "lucide-react";
import Link from "next/link";
import SignoutButton from "./SignoutButton";
import { buttonVariants } from "./ui/button";

export const NavBar = () => {
  const { data, isPending } = authClient.useSession();
  if (isPending) return <div>Loading...</div>;

  const session = data;


  return (
    <div className="border-b px-4 py-3 fixed top-0 left-0 right-0 z-50 bg-zinc-100 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <AirVent className="h-6 w-6" />
        <span className="font-bold">nextsecure.</span>
      </Link>
      <div className="flex items-center gap-2">
        {!session ? (<>
          <Link href="sign-in" className={buttonVariants()}>
            Sign In
          </Link>
          <Link href="sign-up" className={buttonVariants()}>
            Sign Up
          </Link>
        </>) : <SignoutButton />}

      </div>
    </div>
  );
};
