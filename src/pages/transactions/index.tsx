import Layout from "@/components/Layout";
import TransactionCard from "@/components/Transaction/TransactionCard";
import { api } from "@/utils/api";
import { IoFilter } from "react-icons/io5";
import _ from "lodash";
import { type Transaction } from "@prisma/client";
import { parseDate } from "@/utils";
import { motion } from "framer-motion";
import { NoTransactions } from "@/components/Transaction/NoTransactions";
import TransactionList from "@/components/Transaction/TransactionList";
import TransactionListWithFilter from "@/components/Transaction/TransactionListWithFilter";

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
          <TransactionListWithFilter
            groupedTransactions={groupedTransactions}
          />
        </div>
      </main>
    </Layout>
  );
}

export default Transactions;
