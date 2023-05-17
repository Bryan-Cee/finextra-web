import { type GetServerSidePropsContext } from "next";
import {
  Awaitable,
  getServerSession,
  RequestInternal,
  User,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user, token }) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.image = user.image;
        // session.user.role = user.role;// <-- put other properties on the session here
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  jwt: {
    secret: env.NEXTAUTH_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        console.log({ credentials });
        if (
          credentials?.username === "jsmith@gmail.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "2",
            name: "John Smith",
          };
        }
        return null;
      },
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
