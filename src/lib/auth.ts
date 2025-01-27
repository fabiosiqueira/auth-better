import { sendEmail } from "@/actions/email";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, openAPI } from "better-auth/plugins";
import prisma from "./prisma";
const options = {
  database: prismaAdapter(prisma, {
    provider: "sqlite"
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  },
  user: {
    additionalFields: {
      premium: {
        type: "boolean",
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }) => {
        await sendEmail({
          to: newEmail,
          subject: "Verify your email change",
          body: `Click the link to verify: ${url}`
        });
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      sendEmail({
        to: user.email,
        subject: "Reset your password",
        body: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=/email-verified`;
      sendEmail({
        to: user.email,
        subject: "Verify your email address",
        body: `Click the link to verify your email: ${verificationUrl}`,
      });
    },
  },
  plugins: [
    openAPI(),
    admin({
      // impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
    })
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth(options);

// class BetterAuthServer {
//   private _auth;
//   private _options;

//   constructor(options: BetterAuthOptions = {}) {
//     this._options = options;
//     this._auth = betterAuth(options);
//   }

//   setConfiguration(options: Partial<BetterAuthOptions> = {}) {
//     this._auth = betterAuth({
//       ...this._options,
//       ...options
//     });
//   }

//   get auth() {
//     return this._auth;
//   }

// }

// const betterAuthServerSingleton = () => {
//   return new BetterAuthServer(options);
// };

// declare const globalThis: {
//   authServer: ReturnType<typeof betterAuthServerSingleton>;
// } & typeof global;

// export const authServer = globalThis.authServer ?? betterAuthServerSingleton();

// if (process.env.NODE_ENV !== "production") globalThis.authServer = authServer;

// export const auth = authServer.auth;

export type Session = typeof auth.$Infer.Session;