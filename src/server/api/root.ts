import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { accountsRouter } from "@/server/api/routers/accounts";
import { fundAccountsRouter } from "@/server/api/routers/fund-accounts";
import { transactionsRouter } from "@/server/api/routers/transactions";
import { assetTypesRouter } from "@/server/api/routers/asset-type";
import { transactionTypeRouter } from "@/server/api/routers/transaction-type";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  accounts: accountsRouter,
  fundAccounts: fundAccountsRouter,
  transactionTypes: transactionTypeRouter,
  assetTypes: assetTypesRouter,
  transactions: transactionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
