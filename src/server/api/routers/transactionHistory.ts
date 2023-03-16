import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TransactionType } from "@prisma/client";

export const transactionHistoryRouter = createTRPCRouter({

  getTransactionHistoryForTransaction: protectedProcedure
    .input(z.object({
      transactionId: z.string(),
      accountId: z.string(),
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.transactionHistory.findMany({
        where: {
          transactionId: input.transactionId,
          accountId: input.accountId,
        },
        orderBy: {
          created_at: "desc",
        }
      });
    }),

  createTransactionHistory: protectedProcedure
    .input(z.object({
      transactionId: z.string(),
      fundAccountId: z.string(),
      amount: z.number(),
      description: z.string(),
      expense_date: z.date(),
      updated_at: z.date(),
      created_at: z.date(),
      accountId: z.string(),
      type: z.enum([TransactionType.WITHDRAW, TransactionType.DEPOSIT, TransactionType.INTEREST,]),
      expenseDate: z.date(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.transactionHistory
        .create({
          data: {
            userId: ctx.session.user.id,
            accountId: input.accountId,
            transactionId: input.transactionId,
            fundAccountId: input.fundAccountId,
            description: input.description,
            type: input.type,
            amount: input.type === TransactionType.WITHDRAW ? input.amount * -1 : input.amount,
            expense_date: input.expenseDate,
            updated_at: input.updated_at,
          },
        });
    }),
});
