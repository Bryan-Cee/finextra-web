import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TransactionType } from "@prisma/client";

export const transactionsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        take: z.number().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.userId,
        },
        orderBy: {
          created_at: "desc",
        },
        take: input.take,
      });
    }),

  getTransactionById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.transaction.findFirst({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      });
    }),

  getTransactionsByAccountId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.userId,
          accountId: input.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    }),

  createTransaction: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        description: z.string(),
        accountId: z.string(),
        type: z.enum([
          TransactionType.WITHDRAW,
          TransactionType.DEPOSIT,
          TransactionType.INTEREST,
        ]),
        expenseDate: z.date(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.transaction.create({
        data: {
          userId: ctx.userId,
          accountId: input.accountId,
          amount:
            input.type === TransactionType.WITHDRAW
              ? input.amount * -1
              : input.amount,
          description: input.description.trim(),
          type: input.type,
          expense_date: input.expenseDate,
        },
      });
    }),

  updateTransaction: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number(),
        description: z.string(),
        accountId: z.string(),
        type: z.enum([
          TransactionType.WITHDRAW,
          TransactionType.DEPOSIT,
          TransactionType.INTEREST,
        ]),
        expenseDate: z.date(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.transaction.update({
        where: {
          id: input.id,
        },
        data: {
          userId: ctx.userId,
          accountId: input.accountId,
          amount:
            input.type === TransactionType.WITHDRAW
              ? input.amount * -1
              : input.amount,
          description: input.description.trim(),
          type: input.type,
          expense_date: input.expenseDate,
        },
      });
    }),
});
