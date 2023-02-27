import React from "react";
import { GrFormFilter } from "react-icons/gr";
import TransactionCard from "./TransactionCard";
// import { parsedData } from "@/utils/sms-data";
// import {
// type ParsedMessage,
// ParsedMessageFailure,
// } from "sms-transaction-parser";

const TransactionList = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const transactions: any[] = []
    .map((m: { parsed: never }) => m.parsed)
    .filter(
      (s: { type: string }) =>
        s.type === "M-PESA-DEPOSIT" ||
        s.type === "M-PESA-PAID" ||
        s.type === "M-PESA-SENT" ||
        s.type === "M-PESA-WITHDRAW"
    );
  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-4 text-2xl font-semibold text-content-primary">
          Messages
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
        <div>
          <h5 className="border-b text-sm font-semibold leading-[48px] text-content-secondary">
            24 September 2022
          </h5>
          <div>
            {transactions.map((message, idx) => (
              <TransactionCard
                key={idx}
                title={
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  "" ||
                  "" ||
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  ""
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type={"No Type"}
                date={12345678}
                amount={12}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
