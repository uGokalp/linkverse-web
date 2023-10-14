import BackendService from "@/lib/backend";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const token = await BackendService.login(
          credentials.email,
          credentials.password
        );
        if (!token) {
          return null;
        }
        const user = await BackendService.getProfile(token.token);

        return {
          id: user.ID,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
          token: token.token,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.token;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {

      session.token = token.accessToken as string;
      session.error = token.error;
      if (token.email) {
        session.user.email = token.email;
      }
      return Promise.resolve(session);
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
};
