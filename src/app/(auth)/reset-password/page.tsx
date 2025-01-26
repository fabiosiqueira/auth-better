"use client";

import LoadingButton from "@/components/LoadingButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { resetPasswordSchema } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ResetPasswordContent() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isPending, setIsPending] = useState(false);
  const token = new URLSearchParams(window.location.search).get("token");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    setIsPending(true);
    if (!token) {
      toast({
        title: "Error",
        description: "Token Inválido",
        variant: "destructive",
      });
      return;
    }
    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Password reset successful. Login to continue.",
      });
      router.push("/sign-in");
    }
    setIsPending(false);
  };

  if (error === "INVALID_TOKEN") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Invalid Reset Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              This password reset link is invalid or has expired.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton pending={isPending}>Reset Password</LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}