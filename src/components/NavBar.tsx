import { auth } from "@/lib/auth";
import { AirVent } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";

export const NavBar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
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
          </>) : <>
            <form action={async () => {
              "use server";
              await auth.api.signOut({
                headers: await headers()
              });
              redirect("/");
            }}>
              <Button type="submit" className={buttonVariants()}>
                Logout
              </Button>
            </form>
          </>}

        </div>
      </div>
    </div>
  );
};
