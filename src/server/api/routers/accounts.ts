import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const accountsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.account.findMany({
      where: {
        userId: ctx.session.user.id,
      }
    });
  }),

  createAccount: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.fundAccount
        .create({
          data: {
            title: input.title,
            description: input.description,
            userId: ctx.session.user.id,
          },
        });
    }),
});
