import Layout from "@/components/Layout";
import { parseDate } from "@/utils";
import { api } from "@/utils/api";
import { type Transaction } from "@prisma/client";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import TransactionListWithFilter from "@/components/Transaction/TransactionListWithFilter";
import Loader from "@/components/Loaders/Loader";

const AccountLoader = () => (
  <div className="flex flex-col gap-2">
    <div className="skeleton h-8 w-4/5 rounded-lg" />
    <div className="skeleton h-6 w-3/5 rounded-lg" />
    <div className="skeleton mt-4 h-12 w-full rounded-lg" />
  </div>
);

const Account = () => {
  const [accountId, setAccountId] = useState<string | null>(null);
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
      const date = parseDate(transaction.created_at);
      return date;
    }
  );

  return (
    <Layout>
      <main className={"mt-4 "}>
        <div className="px-4">
          <div className="mb-4">
            <Loader loader={<AccountLoader />} isLoading={isAccountLoading}>
              <div className="flex flex-col gap-2">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <p className="text-[1.375rem] font-semibold text-black">
                      {accountDetails?.title}
                    </p>
                    <p>{accountDetails?.description}</p>
                  </div>
                  <button
                    className="place-self-start"
                    onClick={() => {
                      void router.push({
                        pathname: `/account/${
                          accountDetails?.id as string
                        }/edit`,
                        query: {
                          title: accountDetails?.title,
                          description: accountDetails?.description,
                        },
                      });
                    }}
                  >
                    <FiEdit
                      size="24px"
                      className="relative  text-content-tertiary"
                    />
                  </button>
                </div>
                <p className="overflow-hidden text-ellipsis text-[2rem] font-medium text-black">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KES",
                  }).format(transactionsAmount || 0)}
                </p>
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
