import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const accountsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.account.findMany({
      where: {
        userId: ctx.session.user.id,
      }
    });
  }),

  updateAccount: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
    })).mutation(({ ctx, input }) => {
      return ctx.prisma.fundAccount.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title.trim(),
          description: input.description.trim(),
        },
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
            title: input.title.trim(),
            description: input.description.trim(),
            userId: ctx.session.user.id,
          },
        });
    }),
});
