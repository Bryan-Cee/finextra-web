import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";

const TransactionItem = () => {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    setTransactionId(router.query.id as string);
  }, [router.query.id]);

  const { data: transaction } = api.transactions.getTransactionById.useQuery(
    {
      id: router.query.id as string,
    },
    { enabled: !!transactionId }
  );
  return (
    <Layout>
      <main className={"mt-4 w-screen"}>
        <div className="mb-4 px-4">
          <div>
            <h1 className="mb-4 text-2xl font-semibold text-content-primary">
              Transaction
            </h1>
            <div className="flex flex-col items-center">
              <div>
                {transaction?.type === "DEPOSIT" && (
                  <GiPayMoney size="24px" color="#37517e" />
                )}
                {transaction?.type === "INTEREST" && (
                  <GiReceiveMoney size="24px" color="#37517e" />
                )}
                {transaction?.type === "WITHDRAW" && (
                  <GiTakeMyMoney size="24px" color="#37517e" />
                )}
              </div>
              <div>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(transaction?.amount || 0)}
              </div>
              <div>{transaction?.created_at.toLocaleDateString()}</div>
              <div>{transaction?.description}</div>
              <div>{transaction?.expense_date.toLocaleDateString()}</div>
              <div>{transaction?.type}</div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TransactionItem;
