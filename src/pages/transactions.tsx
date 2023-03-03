import Layout from "@/components/Layout";
import TransactionCard from "@/components/Transaction/TransactionCard";
import { api } from "@/utils/api";
import { GrFormFilter } from "react-icons/gr";
import groupBy from "lodash.groupBy";
import { type Transaction } from "@prisma/client";
import { parseDate } from "@/utils";

function Transactions() {
  const { data: transactions } = api.transactions.getAll.useQuery();

  const groupedTransactions = groupBy<Transaction>(
    transactions,
    (transaction) => {
      const date = parseDate(+transaction.created_at.valueOf());
      return date;
    }
  );

  return (
    <Layout>
      <main className={"mt-4 w-screen"}>
        <div className="mb-4 px-4">
          <div className="mb-4">
            <h1 className="mb-4 text-2xl font-semibold text-content-primary">
              Transactions
            </h1>
            <div>
              <button
                disabled
                type="button"
                className="flex h-8 flex-row items-center bg-background-neutral py-3 px-2 text-content-accent"
              >
                <GrFormFilter className="mr-2 font-semibold" />
                <span className="text-sm font-semibold">Filter</span>
              </button>
            </div>
          </div>
          <div>
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
      </main>
    </Layout>
  );
}

export default Transactions;
