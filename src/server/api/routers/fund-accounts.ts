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
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.fundAccount.findMany();
  }),

  getAccountById: protectedProcedure.input(z.object({
    id: z.string(),
  })).query(({ ctx, input }) => {
    return ctx.prisma.fundAccount.findUnique({
      where: {
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
      "FundAccount".id = ${input.id}
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
    GROUP BY
      "FundAccount".id,
      "FundAccount".title;`
  }),
});
