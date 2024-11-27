import { betterAuth } from "npm:better-auth";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: Deno.env.get("GOOGLE_CLIENT_ID")!,
      clientSecret: Deno.env.get("GOOGLE_CLIENT_SECRET")!,
    },
  },
});
