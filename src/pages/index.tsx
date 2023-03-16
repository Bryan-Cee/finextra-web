import Head from "next/head";
import Link from "next/link";

import AccountCard, { AddAccountCard } from "@/components/AccountCard";
import Layout from "@/components/Layout";
import ROUTES from "@/routes";
import { api } from "@/utils/api";
import { motion } from "framer-motion";
import TransactionList from "@/components/Transaction/TransactionList";
import Loader from "@/components/Loaders/Loader";
import { TransactionListWithFilterLoader } from "@/components/Transaction/TransactionListWithFilter";

const AccountsLoader = () => (
  <div className="flex flex-[0_0_170px] flex-row gap-4 ">
    <div className="skeleton h-[170px] w-40 rounded-lg" />
    <div className="skeleton h-[170px] w-40 rounded-lg" />
  </div>
);

const Home = () => {
  const { data: fundAccounts, isLoading: isGetFundSummaryLoading } =
    api.fundAccounts.getFundSummary.useQuery();
  const { data: transactions, isLoading: isGetTransactionsLoading } =
    api.transactions.getAll.useQuery({
      take: 4,
    });

  return (
    <>
      <Head>
        <title>Fin-Extra</title>
        <meta
          name="description"
          content="Home page for financial tracking web app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <main className={"mt-4 w-screen"}>
          <div className="px-4">
            <div className="">
              <h1 className="mb-2 text-2xl font-semibold text-content-primary">
                Accounts
              </h1>
              <Loader
                loader={<AccountsLoader />}
                isLoading={isGetFundSummaryLoading}
              >
                <div className="flex items-center overflow-hidden">
                  <motion.div
                    layout
                    className="flex snap-x justify-start gap-4 overflow-x-scroll scroll-smooth [&::-webkit-scrollbar]:hidden"
                  >
                    {fundAccounts &&
                      fundAccounts.map((account) => (
                        <AccountCard
                          key={account.title}
                          href={`${ROUTES.ACCOUNT}/${account.id}`}
                          account={account.title}
                          balance={account.total}
                        />
                      ))}
                    <AddAccountCard href={ROUTES.ADD_ACCOUNT.ROOT} />
                  </motion.div>
                </div>
              </Loader>
            </div>
            <div className="mt-4">
              <div className="flex flex-row justify-between border-b py-2">
                <h5 className="text-sm font-semibold text-content-secondary">
                  Transactions
                </h5>
                {!!transactions?.length && (
                  <Link
                    href={ROUTES.TRANSACTION}
                    className="font-semibold text-content-accent underline"
                  >
                    See all
                  </Link>
                )}
              </div>
              <Loader
                count={3}
                loader={<TransactionListWithFilterLoader />}
                isLoading={isGetTransactionsLoading}
              >
                <TransactionList transactions={transactions} />
              </Loader>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

Home.auth = true;

export default Home;
