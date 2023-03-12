import Layout from "@/components/Layout";
import TransactionCard from "@/components/Transaction/TransactionCard";
import { api } from "@/utils/api";
import { IoFilter } from "react-icons/io5";
import _ from "lodash";
import { type Transaction } from "@prisma/client";
import { parseDate } from "@/utils";

function Transactions() {
  const { data: transactions } = api.transactions.getAll.useQuery({});

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
        <div className="mb-4 px-4">
          <div className="mb-4">
            <h1 className="mb-4 text-2xl font-semibold text-content-primary">
              Transactions
            </h1>
            <div className="mt-3 flex gap-2">
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                type="text"
                className="w-[260px] rounded-full border py-0.5 px-3"
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
