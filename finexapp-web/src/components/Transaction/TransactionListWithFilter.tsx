import { parseDate } from "@/utils";
import React from "react";
import { IoFilter } from "react-icons/io5";
import { NoTransactions } from "./NoTransactions";
import TransactionCard from "./TransactionCard";
import { type Transaction } from "@prisma/client";
import Loader from "../Loaders/Loader";

export const TransactionListWithFilterLoader = () => (
  <div className="flex flex-row gap-4 py-2.5">
    <div className="skeleton h-12 w-12 rounded-full" />
    <div className="flex w-4/5 flex-col gap-3">
      <div className="skeleton h-4 w-2/5 rounded-lg" />
      <div className="skeleton h-4 w-full rounded-lg" />
    </div>
  </div>
);

const TransactionListWithFilter = ({
  groupedTransactions,
  isLoading,
}: {
  groupedTransactions: _.Dictionary<Transaction[]>;
  isLoading: boolean;
}) => {
  return (
    <div className="">
      <div className="mb-4">
        <h1 className="mb-4 text-2xl font-semibold text-content-primary">
          Transactions
        </h1>
        <div>
          <div className="mt-3 flex gap-2">
            <input
              onChange={(e) => {
                console.log(e.target.value);
              }}
              type="text"
              className="w-[calc(100%-5rem)] rounded-full border py-0.5 px-3"
            />
            <button
              onClick={() => {
                console.log("Filter");
              }}
              type="button"
              className="flex h-8 flex-row items-center rounded bg-background-neutral py-3 px-2 text-content-accent"
            >
              <IoFilter className="mr-2 font-semibold" />
              <span className="text-sm font-semibold">Filter</span>
            </button>
          </div>
        </div>
      </div>
      <Loader
        count={5}
        loader={<TransactionListWithFilterLoader />}
        isLoading={isLoading}
      >
        <div className="mb-8">
          {groupedTransactions &&
          Object.entries(groupedTransactions).length > 0 ? (
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
            )
          ) : (
            <div className="flex h-80 items-center justify-center">
              <NoTransactions />
            </div>
          )}
        </div>
      </Loader>
    </div>
  );
};

export default TransactionListWithFilter;
