"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function EmailVerified() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Email Verified!</CardTitle>
        <CardDescription>
          <div className="flex flex-col items-center justify-center grow space-y-4">
            <p className="text-gray-600">
              Your email has been successfully verified.
            </p>
            <Link href="/dashboard" className={`${buttonVariants()} w-full`}>
              Go To Home
            </Link>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>

      </CardContent>
    </Card>
  );
}
