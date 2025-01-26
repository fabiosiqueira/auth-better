import { sendEmail } from "@/actions/email";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false // # ToDo Implementar
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/
      verify-email?token=${token}&callbackURL=/email-verified`;
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        body: `Click the link to verify your email: ${verificationUrl}`,
      });
    },
  }
} satisfies BetterAuthOptions);