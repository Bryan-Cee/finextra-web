import Head from "next/head";
import Link from "next/link";

import AccountCard, { AddAccountCard } from "@/components/AccountCard";
import Layout from "@/components/Layout";
import TransactionCard from "@/components/Transaction/TransactionCard";
import ROUTES from "@/routes";
import { api } from "@/utils/api";
import _ from "lodash";
import { type FundAccount, type Transaction } from "@prisma/client";

const parseAccountTotals = (
  transactions: _.Dictionary<Transaction[]>,
  accounts: _.Dictionary<FundAccount[]>
) => {
  const accountData: Record<string, Transaction[]> = {};

  for (const [key, value] of Object.entries(accounts)) {
    const account = value[0]?.title;
    if (account) {
      accountData[account] = transactions[key] as unknown as Transaction[];
    }
  }

  const accountTotals = Object.entries(accountData).map(([key, value]) => {
    const accountId = value[0]?.accountId as string;
    const total = value.reduce((acc, curr) => {
      if (curr.type === "WITHDRAW") {
        return acc - curr.amount;
      } else {
        return acc + curr.amount;
      }
    }, 0);
    return { accountId, account: key, total };
  });
  return accountTotals;
};

const Home = () => {
  const { data: transactions } = api.transactions.getAll.useQuery();
  const { data: accounts } = api.fundAccounts.getAll.useQuery();

  const groupedTransactions = _.groupBy(transactions, "accountId");
  const groupedAccounts = _.groupBy(accounts, "id");
  const accountTotals = parseAccountTotals(
    groupedTransactions,
    groupedAccounts
  );

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
              <div className="flex h-32 items-center overflow-hidden">
                <div className="flex snap-x justify-start gap-4 overflow-x-scroll scroll-smooth [&::-webkit-scrollbar]:hidden">
                  {accountTotals && accountTotals.length > 0
                    ? accountTotals.map((account) => (
                        <AccountCard
                          key={account.account}
                          href={`${ROUTES.ACCOUNT}/${account.accountId}`}
                          account={account.account}
                          balance={account.total}
                        />
                      ))
                    : null}
                  <AddAccountCard href={ROUTES.ADD_ACCOUNT} />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-row justify-between border-b py-2">
                <h5 className="text-sm font-semibold text-content-secondary">
                  Transactions
                </h5>
                <Link
                  href={ROUTES.TRANSACTION}
                  className="font-semibold text-content-accent underline"
                >
                  See all
                </Link>
              </div>
              <div>
                {transactions &&
                  transactions
                    .slice(0, 3)
                    .map((transaction) => (
                      <TransactionCard
                        key={transaction.id}
                        id={transaction.id}
                        title={transaction.description || ""}
                        date={transaction.created_at}
                        amount={transaction.amount}
                        type={transaction.type}
                      />
                    ))}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

Home.auth = true;

export default Home;
