import Head from "next/head";
import Link from "next/link";

import AccountCard, { AddAccountCard } from "@/components/AccountCard";
import Layout from "@/components/Layout";
import TransactionCard from "@/components/Transaction/TransactionCard";
import ROUTES from "@/routes";

const Home = () => {
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
                  <AccountCard
                    href={ROUTES.ACCOUNT}
                    account="M-PESA"
                    balance={23532.09}
                  />
                  <AccountCard
                    href={ROUTES.ACCOUNT}
                    account="M-PESA"
                    balance={23532.09}
                  />
                  <AccountCard
                    href={ROUTES.ACCOUNT}
                    account="Stanbic Bank Kenya"
                    balance={23000.09}
                  />
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
                <TransactionCard
                  title={"Brian Cheruiyot"}
                  type={"Sent"}
                  date={1675967630594}
                  amount={298.35}
                />
                <TransactionCard
                  title={"Brian Cheruiyot"}
                  type={"Sent"}
                  date={1675967630594}
                  amount={298.35}
                />
                <TransactionCard
                  title={"Brian Cheruiyot"}
                  type={"Sent"}
                  date={1675967630594}
                  amount={298.35}
                />
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
