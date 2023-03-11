import Head from "next/head";
import Link from "next/link";

import AccountCard, { AddAccountCard } from "@/components/AccountCard";
import Layout from "@/components/Layout";
import ROUTES from "@/routes";
import { api } from "@/utils/api";
import TransactionCard from "@/components/Transaction/TransactionCard";

const Home = () => {
  const { data: fundAccounts } = api.fundAccounts.getFundSummary.useQuery();
  const { data: transactions } = api.transactions.getAll.useQuery({ take: 3 });

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
              <div className="flex items-center overflow-hidden">
                <div className="flex snap-x justify-start gap-4 overflow-x-scroll scroll-smooth [&::-webkit-scrollbar]:hidden">
                  {fundAccounts &&
                    fundAccounts.map((account) => (
                      <AccountCard
                        key={account.title}
                        href={`${ROUTES.ACCOUNT}/${account.id}`}
                        account={account.title}
                        balance={account.total}
                      />
                    ))}
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
                  transactions.map((transaction) => (
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
