import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { BsPlusSquareDotted } from "react-icons/bs";
import { parseAmount, parseDate, parseDateWithSuffix } from "@/utils";
import { FiEdit } from "react-icons/fi";
import Loader from "@/components/Loaders/Loader";
import { diff, isDate } from "@/utils/diff";
import { type Transaction } from "@prisma/client";
import { isNumber } from "lodash";
import { TransactionListWithFilterLoader } from "@/components/Transaction/TransactionListWithFilter";

const TransactionItemLoader = () => {
  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="skeleton h-20 w-20 place-self-center rounded-full" />
      <div className="flex flex-col items-center justify-center">
        <div className="skeleton my-2 h-9 w-5/6 rounded-lg" />
        <div className="skeleton h-7 w-32 rounded-lg" />
      </div>
      <hr className="my-4 h-0 w-full border border-dashed border-border-neutral" />
      <div className="mt-4 flex flex-col gap-3">
        <div className="mb-4 flex flex-col gap-2">
          <div className="skeleton h-7 w-[50%] rounded-lg" />
          <div className="skeleton h-7 w-[80%] rounded-lg" />
        </div>

        <div className="skeleton h-6 w-full rounded-lg" />
        <div className="skeleton h-6 w-full rounded-lg" />
        <div className="skeleton h-6 w-full rounded-lg" />
      </div>
      <hr className="my-4 h-0 w-full border border-dashed border-border-neutral" />
    </div>
  );
};

const TransactionItem = () => {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    setTransactionId(router.query.id as string);
  }, [router.query.id]);

  const { data: transaction, isLoading } =
    api.transactions.getTransactionById.useQuery(
      { id: router.query.id as string },
      { enabled: !!transactionId }
    );
  const { data: account } = api.fundAccounts.getAccountById.useQuery(
    {
      id: transaction?.accountId as string,
    },
    {
      enabled: !!transaction?.accountId,
    }
  );

  const { data: transactionHistory, isLoading: historyLoading } =
    api.transactionHistory.getTransactionHistoryForTransaction.useQuery(
      {
        accountId: transaction?.accountId as string,
        transactionId: transactionId as string,
      },
      {
        enabled:
          !!transaction?.accountId && !!transaction?.id && !!transactionId,
      }
    );

  function getParsedHistory(
    diffedHistory: ReturnType<typeof getDiffBetweenTransactionHistory>
  ) {
    const keys = [
      "id",
      "description",
      "amount",
      "type",
      "expense_date",
      "accountId",
      "created_at",
    ];
    const parsedHistory = diffedHistory.map((item) => {
      const parsedItem: Record<string, unknown> = {};
      keys.forEach((key) => {
        if (item[key]) {
          parsedItem[key] = item[key];
        }
      });
      return parsedItem;
    });
    return parsedHistory;
  }

  function getDiffBetweenTransactionHistory(
    transactionHistory: Transaction[],
    initialTransaction: Transaction
  ) {
    const diffChange: Record<string, unknown>[] = [];
    if (!transactionHistory.length) return diffChange;

    transactionHistory.reduce((acc, curr) => {
      const diffResult = diff<Transaction>(acc, curr);
      if (Object.keys(diffResult).length > 0) {
        diffChange.push(diffResult);
      }

      return curr;
    }, initialTransaction);
    return diffChange;
  }

  const parsedHistory = getParsedHistory(
    getDiffBetweenTransactionHistory(
      transactionHistory || [],
      transaction || ({} as Transaction)
    )
  );

  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  }).format(transaction?.amount || 0);

  return (
    <Layout>
      <main className={"mt-4 w-screen"}>
        <div className="mb-4 px-4">
          <div>
            <Loader loader={<TransactionItemLoader />} isLoading={isLoading}>
              <div className="flex flex-col gap-3">
                <button
                  className="place-self-end"
                  onClick={() => {
                    void router.push({
                      pathname: `/transactions/${
                        transaction?.id as string
                      }/edit`,
                    });
                  }}
                >
                  <FiEdit
                    size="24px"
                    className="relative  text-content-tertiary"
                  />
                </button>
                <div className="flex justify-center">
                  {transaction?.type === "DEPOSIT" && (
                    <GiPayMoney size="80px" color="#37517e" />
                  )}
                  {transaction?.type === "INTEREST" && (
                    <GiReceiveMoney size="80px" color="#37517e" />
                  )}
                  {transaction?.type === "WITHDRAW" && (
                    <GiTakeMyMoney size="80px" color="#37517e" />
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p
                    className={`my-2 font-semibold ${
                      amount.length > 20 ? "text-2xl" : "text-3xl"
                    }`}
                  >
                    {amount}
                  </p>

                  <span
                    className={`rounded-full ${
                      transaction?.type === "WITHDRAW"
                        ? "bg-interactive-negative"
                        : transaction?.type === "INTEREST"
                        ? "bg-interactive-warning"
                        : "bg-interactive-positive"
                    } py-1 px-3 text-sm font-semibold text-white`}
                  >
                    {transaction?.type}
                  </span>
                </div>
                <hr className="my-4 h-0 w-full border border-dashed border-border-neutral" />
                <p className="text-lg font-semibold text-primary">
                  Transaction Details
                </p>

                <p className="font-semibold">{transaction?.description}</p>
                <div className="flex justify-between text-sm">
                  <p>Amount</p>
                  <p>{amount}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Expense Date</p>
                  <p>{parseDate(transaction?.expense_date)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Account</p>
                  <p>{account?.title}</p>
                </div>

                <hr className="my-4 h-0 w-full border border-dashed border-border-neutral" />
                <div className="mb-4">
                  <p className="mb-4 text-lg font-semibold text-primary">
                    History
                  </p>
                  <div className="my-4">
                    <Loader
                      count={2}
                      isLoading={historyLoading}
                      loader={<TransactionListWithFilterLoader />}
                    >
                      <ul className="flex flex-col gap-y-8 pl-6">
                        {parsedHistory?.map((history) => (
                          <li
                            key={history.id as string}
                            className="flex flex-row gap-4"
                          >
                            <BsPlusSquareDotted />
                            <div className="flex flex-col gap-2">
                              <span className="text-sm font-normal leading-none ">
                                {transaction &&
                                  parseDateWithSuffix(
                                    history.created_at as Date
                                  )}
                              </span>
                              <div className="mr-4 text-sm leading-none text-content-tertiary">
                                <div className="flex flex-col gap-2">
                                  <p className="mb-2">Edited Fields</p>

                                  {Object.entries(history).map(
                                    ([key, value]) => {
                                      if (key === "created_at" || key === "id")
                                        return null;
                                      return (
                                        <div key={key}>
                                          <span>
                                            {`${key
                                              .charAt(0)
                                              .toUpperCase()}${key.substring(
                                              1
                                            )}`}
                                            :{" "}
                                          </span>
                                          <span className="font-medium">
                                            {isDate(value)
                                              ? parseDate(value as Date)
                                              : isNumber(value)
                                              ? parseAmount(value)
                                              : `${value as string}`}
                                          </span>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}

                        <li className="flex flex-row gap-4">
                          <BsPlusSquareDotted />
                          <div className="flex flex-col gap-2">
                            <span className="text-sm font-normal leading-none ">
                              {transaction &&
                                parseDateWithSuffix(transaction.created_at)}
                            </span>
                            <p className="mr-4 text-sm leading-none text-content-tertiary">
                              Transaction Created
                            </p>
                          </div>
                        </li>
                      </ul>
                    </Loader>
                  </div>
                </div>
              </div>
            </Loader>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TransactionItem;
