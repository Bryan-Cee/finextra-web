import Layout from "@/components/Layout";
import React from "react";
import ROUTES from "@/routes";
import Link from "next/link";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { api } from "@/utils/api";

// const PortfolioLoader = () => (
//   <div className="flex flex-col gap-2">
//     <div className="skeleton h-8 w-4/5 rounded-lg" />
//     <div className="skeleton h-6 w-3/5 rounded-lg" />
//     <div className="skeleton mt-4 h-12 w-full rounded-lg" />
//   </div>
// );

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
  const { data: fundAccounts } =
    api.fundAccounts.getFundAccountTransactionsSummary.useQuery();

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
            <div className="">
              <p className="overflow-hidden text-ellipsis text-[2rem] font-medium text-black">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(total as number)}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-4 border-b py-2 text-sm font-semibold text-content-secondary">
              Investment Accounts
            </p>
            <div className="flex flex-col gap-4">
              {fundAccounts &&
                fundAccounts.map((account) => (
                  <PortfolioAccount key={account.accountId} account={account} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Accounts;
