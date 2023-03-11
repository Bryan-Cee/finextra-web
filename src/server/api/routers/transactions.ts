import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TransactionType } from "@prisma/client";

export const transactionsRouter = createTRPCRouter({

  getAll: protectedProcedure.input(z.object({
    take: z.number().optional(),
  })).query(({ ctx, input }) => {
    return ctx.prisma.transaction.findMany(
      {
        orderBy: {
          created_at: 'desc'
        }
        , take: input.take || 10,
      }
    );
  }),

  getTransactionsByAccountId: protectedProcedure.input(z.object({
    id: z.string(),
  })).query(({ ctx, input }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        accountId: input.id,
      },
    });
  }),

  createTransaction: protectedProcedure
    .input(z.object({
      amount: z.number(),
      description: z.string(),
      accountId: z.string(),
      type: z.enum([TransactionType.WITHDRAW, TransactionType.DEPOSIT, TransactionType.INTEREST,]),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.transaction
        .create({
          data: {
            userId: ctx.session.user.id,
            accountId: input.accountId,
            amount: input.type === TransactionType.WITHDRAW ? input.amount * -1 : input.amount,
            description: input.description,
            type: input.type,
          },
        });
    }),
});
