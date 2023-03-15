import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
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
