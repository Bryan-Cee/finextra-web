import React from "react";
import { GrFormFilter } from "react-icons/gr";
import TransactionCard from "./TransactionCard";

const TransactionList = () => {
  const transactions: any[] = [];
  return (
    <div>
      <h5 className="border-b text-sm font-semibold leading-[48px] text-content-secondary">
        24 September 2022
      </h5>
      <div>
        {transactions.map((message, idx) => (
          <TransactionCard
            key={idx}
            title={"No Title"}
            type="CASH"
            date={12345678}
            amount={12}
            id={""}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
