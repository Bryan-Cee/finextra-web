import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TransactionType } from "@prisma/client";

export const transactionsRouter = createTRPCRouter({

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany(
      {
        orderBy: {
          created_at: 'desc'
        }
      }
    );
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
            amount: input.amount,
            description: input.description,
            type: input.type,
          },
        });
    }),
});
