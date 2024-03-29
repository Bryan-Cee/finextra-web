import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import _ from "lodash";
import { type Transaction } from "@prisma/client";
import { parseDate } from "@/utils";
import TransactionListWithFilter from "@/components/Transaction/TransactionListWithFilter";

function Transactions() {
  const { data: transactions, isLoading } = api.transactions.getAll.useQuery(
    {}
  );

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
        <div className="mb-4 px-4">
          <TransactionListWithFilter
            groupedTransactions={groupedTransactions}
            isLoading={isLoading}
          />
        </div>
      </main>
    </Layout>
  );
}

export default Transactions;
