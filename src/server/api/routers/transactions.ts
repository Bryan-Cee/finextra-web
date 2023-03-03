/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { Transaction, TransactionType } from "@prisma/client";

export const transactionsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),

  createTransaction: protectedProcedure
    .input(z.object({
      amount: z.number(),
      description: z.string(),
      type: z.enum([TransactionType.WITHDRAW, TransactionType.DEPOSIT, TransactionType.WITHDRAW]),
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.transaction
        .create({
          data: {
            userId: ctx.session.user.id,
            accountId: ctx.session.user.id,
            amount: input.amount,
            description: input.description,
            type: input.type,
          },
        });
    }),
});
