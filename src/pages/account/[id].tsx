import Layout from "@/components/Layout";
import TransactionCard from "@/components/Transaction/TransactionCard";
import { parseDate } from "@/utils";
import { api } from "@/utils/api";
import { type Transaction } from "@prisma/client";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { GrFormAdd, GrFormFilter } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";

const Account = () => {
  const router = useRouter();

  const { data: accountDetails } = api.fundAccounts.getAccountById.useQuery({
    id: router.query.id as string,
  });
  const { data: transactions } =
    api.transactions.getTransactionsByAccountId.useQuery({
      id: router.query.id as string,
    });

  const transactionsAmount = transactions?.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const groupedTransactions = _.groupBy<Transaction>(
    transactions,
    (transaction) => {
      const date = parseDate(+transaction.created_at.valueOf());
      return date;
    }
  );

  return (
    <Layout>
      <main className={"mt-4 w-screen"}>
        <div className="px-4">
          <div className="mb-8">
            <div className="flex flex-col gap-2">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-[1.375rem] font-semibold text-black">
                    {accountDetails?.title}
                  </p>
                  <p>{accountDetails?.description}</p>
                </div>
                <button
                  onClick={() => {
                    console.log("Edit");
                  }}
                >
                  <FiEdit
                    size="24px"
                    className="relative  text-content-tertiary"
                  />
                </button>
              </div>

              <p className="mb-2 text-4xl font-medium text-black">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(transactionsAmount || 0)}
              </p>
              <div className="flex">
                <div className="w-fit rounded-full bg-interactive-positive-hover p-3">
                  <GrFormAdd size="24px" className="relative  text-white" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[1.375rem] font-semibold text-primary">
              Transactions
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                className="w-[260px] rounded-full border py-0.5 px-3"
              />
              <button
                disabled
                type="button"
                className="flex h-8 flex-row items-center bg-background-neutral py-3 px-2 text-content-accent"
              >
                <GrFormFilter className="mr-2 font-semibold" />
                <span className="text-sm font-semibold">Filter</span>
              </button>
            </div>
            <div className="mb-5">
              {groupedTransactions &&
                Object.entries(groupedTransactions).map(
                  ([date, transactionItem]) => (
                    <div key={date}>
                      <h5 className="border-b text-sm font-semibold leading-[48px] text-content-secondary">
                        {parseDate(new Date(date))}
                      </h5>
                      <div>
                        {transactionItem?.map((transaction) => (
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
                  )
                )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Account;
