import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const options = {
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [
    adminClient()
  ],
};

export const authClient = createAuthClient(options);

// class BetterAuthClient {
//   private _auth;
//   private _options;

//   constructor(options = {}) {
//     this._options = options;
//     this._auth = createAuthClient(options);
//   }

//   set baseURL(baseURL: string) {
//     process.env.BETTER_AUTH_URL = baseURL;
//     this._auth = createAuthClient({
//       ...this._options,
//       baseURL: baseURL
//     });
//   }

//   get auth() {
//     return this._auth;
//   }

// }

// const betterAuthClientSingleton = () => {
//   return new BetterAuthClient(options);
// };

// declare const globalThis: {
//   authClientSingleton: ReturnType<typeof betterAuthClientSingleton>;
// } & typeof global;

// export const authClientSingleton = globalThis.authClientSingleton ?? betterAuthClientSingleton();

// if (process.env.NODE_ENV !== "production") globalThis.authClientSingleton = authClientSingleton;

// export const authClient = authClientSingleton.auth;