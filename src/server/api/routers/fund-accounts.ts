import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

type FundSummary = {
  id: string;
  title: string;
  total: number
}

export const fundAccountsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.fundAccount.findMany({
      where: {
        userId: ctx.session.user.id,
      }
    });
  }),

  getAccountById: protectedProcedure.input(z.object({
    id: z.string(),
  })).query(({ ctx, input }) => {
    return ctx.prisma.fundAccount.findFirst({
      where: {
        userId: ctx.session.user.id,
        id: input.id,
      },
    });
  }),

  getFundAccountTransactionsSummary: protectedProcedure.query(async ({ ctx }) => {
    const accountTotal = await ctx.prisma.transaction.groupBy({
      by: ['accountId'],
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        accountId: 'desc',
      },
      _sum: {
        amount: true,
      },
    }).then((data) => {
      return data.map((account) => {
        return {
          accountId: account.accountId,
          ...account._sum,
        }
      })
    });

    const totalWithoutRecent = accountTotal.map(async (account) => {
      const accountDetails = await ctx.prisma.fundAccount.findFirst({
        where: {
          userId: ctx.session.user.id,
          id: account.accountId,
        },
      });

      const _transactionsWithoutRecent = await ctx.prisma.transaction.aggregate({
        where: {
          userId: ctx.session.user.id,
          accountId: account.accountId,
        },
        orderBy: {
          expense_date: 'desc',
        },
        _sum: {
          amount: true,
        },
        skip: 1,
      });

      const _totalWithoutRecent = _transactionsWithoutRecent._sum.amount as number;

      return {
        accountId: account.accountId,
        title: accountDetails?.title,
        description: accountDetails?.description,
        percentageIncrease: (((account?.amount) as number - _totalWithoutRecent) / _totalWithoutRecent),
        total: account.amount,
      }
    });

    return Promise.all(totalWithoutRecent)
  }),

  getFundSummaryByAccountId: protectedProcedure.input(z.object({
    id: z.string(),
  })).query<FundSummary>(({ ctx, input }) => {
    return ctx.prisma.$queryRaw`
    SELECT
      "FundAccount".id,
      "FundAccount".title,
      SUM("Transaction".amount) AS total
    FROM
      "FundAccount"
    LEFT JOIN
      "Transaction" ON "Transaction"."accountId" = "FundAccount".id
    WHERE
      "FundAccount".id = ${input.id} AND
      "FundAccount"."userId" = ${ctx.session.user.id}
    GROUP BY
      "FundAccount".id,
      "FundAccount".title;`
  }),

  getFundSummary: protectedProcedure.query<FundSummary[]>(({ ctx }) => {
    return ctx.prisma.$queryRaw`
    SELECT
      "FundAccount".id,
      "FundAccount".title,
      SUM("Transaction".amount) AS total
    FROM
      "FundAccount"
    LEFT JOIN
      "Transaction" ON "Transaction"."accountId" = "FundAccount".id
    WHERE "FundAccount"."userId" = ${ctx.session.user.id}
    GROUP BY
      "FundAccount".id,
      "FundAccount".title;`
  }),
});
