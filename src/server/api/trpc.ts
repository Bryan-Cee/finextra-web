import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "../db";
import { auth } from "@clerk/nextjs/server";

type CreateContextOptions = {
  userId: string | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    auth: opts.userId,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the user from Clerk
  const { userId } = getAuth(req);

  return createInnerTRPCContext({
    userId,
  });
};

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  console.log("Enforcing user is authenticated, userId:", ctx.auth);
  if (!ctx.auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      userId: ctx.auth,
      prisma: ctx.prisma,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
