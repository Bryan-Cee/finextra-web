import { type Transaction } from "@prisma/client";
import { motion } from "framer-motion";
import React from "react";
import { NoTransactions } from "./NoTransactions";
import TransactionCard from "./TransactionCard";


const TransactionList = ({
  transactions,
}: {
  transactions?: Transaction[];
}) => {
  return (
    <motion.div layout>
      {transactions?.length ? (
        transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            id={transaction.id}
            title={transaction.description || ""}
            date={transaction.created_at}
            amount={transaction.amount}
            type={transaction.type}
          />
        ))
      ) : (
        <div className="mx-auto mb-12 max-w-sm px-2">
          <NoTransactions />
        </div>
      )}
    </motion.div>
  );
};

export default TransactionList;
