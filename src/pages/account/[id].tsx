import Layout from "@/components/Layout";
import { parseDate } from "@/utils";
import { api } from "@/utils/api";
import { type Transaction } from "@prisma/client";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import TransactionListWithFilter from "@/components/Transaction/TransactionListWithFilter";
import Loader from "@/components/Loader";

const Account = () => {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [status, setIsOpen] = useState<"open" | "closed">("closed");
  const router = useRouter();

  useEffect(() => {
    setAccountId(router.query.id as string);
  }, [router.query.id]);

  const { data: accountDetails, isLoading: isAccountLoading } =
    api.fundAccounts.getAccountById.useQuery(
      {
        id: router.query.id as string,
      },
      { enabled: !!accountId }
    );

  const { data: transactions, isLoading: isTransactionLoading } =
    api.transactions.getTransactionsByAccountId.useQuery(
      {
        id: router.query.id as string,
      },
      { enabled: !!accountId }
    );

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
            <Loader isLoading={isAccountLoading}>
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
                  <div
                    className="w-fit rounded-full bg-interactive-positive-hover p-3"
                    onClick={() => {
                      console.log("Add Transaction");
                      if (status === "open") {
                        setIsOpen("closed");
                      } else {
                        setIsOpen("open");
                      }
                    }}
                  >
                    <GrFormAdd size="24px" className="relative  text-white" />
                  </div>
                </div>
              </div>
            </Loader>
          </div>
          <div>
            <TransactionListWithFilter
              groupedTransactions={groupedTransactions}
              isLoading={isTransactionLoading}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Account;
