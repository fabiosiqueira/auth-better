"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { signInFormSchema } from "@/lib/auth-schema";
import { ErrorContext } from "better-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignInPage() {


  // const [isLoading, startTransition] = useTransition();
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {

    const { email, password } = values;
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    }, {
      onRequest: () => {
        setLoading(true);
        toast({
          title: "Please wait...",
        });
      },
      onSuccess: () => {
        // form.reset();
      },
      onError: (ctx: ErrorContext) => {
        setLoading(false);
        // form.setError("email", {
        //   type: "manual",
        //   message: ctx.error.message
        // });
        console.log(ctx);
        toast({
          title: "Something went wrong",
          description: ctx.error.message ?? "Something went wrong.",
          variant: "destructive",
        });
      },
    });
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@mail.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='text-sm text-muted-foreground'>
          Don&apos;t have an account yet?{" "}
          <Link href='/sign-up' className='text-primary hover:underline'>
            Sign up
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <Link
            href="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
