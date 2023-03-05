import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const transactionTypeRouter = createTRPCRouter({
  getTransactionTypes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.$queryRaw`
      SELECT label FROM (SELECT
          t.typname AS type_name,
          e.enumlabel AS label
      FROM pg_type t
      INNER JOIN pg_enum e
          ON t.oid = e.enumtypid
      WHERE t.typtype = 'e'
      ORDER BY t.typname, e.enumsortorder) as Enums
      WHERE Enums.type_name = 'TransactionType';`;
  })
});
