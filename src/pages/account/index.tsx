import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import ROUTES from "@/routes";
import Link from "next/link";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { api } from "@/utils/api";
import Loader from "@/components/Loaders/Loader";

const AccountsLoader = () => (
  <div className="flex flex-col gap-2">
    <div className="skeleton h-10 w-5/6 rounded-md" />
  </div>
);

const AccountCardLoader = () => (
  <div className="skeleton mb-4 flex h-32 flex-col rounded-md" />
);

type TFundAccounts = {
  accountId: string;
  title: string | undefined;
  description: string | undefined;
  percentageIncrease: number;
  total: number | null;
};

function PortfolioAccount({ account }: { account: TFundAccounts }) {
  return (
    <Link
      href={{
        pathname: ROUTES.ACCOUNT.ID,
        query: { id: account.accountId },
      }}
      className="flex flex-col gap-4 rounded-lg border border-border-neutral p-4"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex gap-2">
          <p className="text-lg font-semibold text-primary">{account.title}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <p className="text-xs">Amount</p>
          <p className="text-xl font-semibold text-black">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "KES",
            }).format(account.total as number)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs text-black">Percentage</p>
          <div
            className={`flex flex-row items-center text-base ${
              account.percentageIncrease > 0
                ? "text-content-positive"
                : "text-content-negative"
            }`}
          >
            {account.percentageIncrease > 0 ? (
              <IoMdArrowDropup />
            ) : (
              <IoMdArrowDropdown />
            )}
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "percent",
              }).format(account.percentageIncrease)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

const Accounts = () => {
  const [fundAccountsSorted, setFundAccountsSorted] = useState<
    TFundAccounts[] | undefined
  >(undefined);
  const { data: fundAccounts, isLoading } =
    api.fundAccounts.getFundAccountTransactionsSummary.useQuery();

  useEffect(() => {
    const sorted = fundAccounts?.sort(
      (a, b) => (b.total as number) - (a.total as number)
    );
    setFundAccountsSorted(sorted);
  }, [fundAccounts]);

  const total = fundAccounts?.reduce(
    (acc, curr) => acc + (curr.total as number),
    0
  );

  return (
    <Layout>
      <main className={"mt-4"}>
        <div className="px-4">
          <div className="mb-4 flex flex-col gap-3">
            <p className="text-2xl font-semibold text-content-primary">
              Asset Summary
            </p>
            <Loader isLoading={isLoading} loader={<AccountsLoader />}>
              <div className="">
                <p className="overflow-hidden text-ellipsis text-[2rem] font-medium text-black">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KES",
                  }).format(total as number)}
                </p>
              </div>
            </Loader>
          </div>
          <div className="mt-4">
            <p className="mb-4 border-b py-2 text-sm font-semibold text-content-secondary">
              Investment Accounts
            </p>
            <div className="flex flex-col gap-4">
              <Loader
                isLoading={isLoading}
                count={2}
                loader={<AccountCardLoader />}
              >
                {fundAccountsSorted &&
                  fundAccountsSorted.map((account) => (
                    <PortfolioAccount
                      key={account.accountId}
                      account={account}
                    />
                  ))}
              </Loader>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Accounts;
