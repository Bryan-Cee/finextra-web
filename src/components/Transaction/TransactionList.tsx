import React from 'react';
import { GrFormFilter } from 'react-icons/gr';
import TransactionCard from './TransactionCard';
import { parsedData } from '@/utils/sms-data';
import { ParsedMessage, ParsedMessageFailure } from 'sms-transaction-parser';

const TransactionList = () => {
  const transactions: ParsedMessage[] = parsedData
    .map((m) => m.parsed)
    .filter(
      (s) =>
        s.type === 'M-PESA-DEPOSIT' ||
        s.type === 'M-PESA-PAID' ||
        s.type === 'M-PESA-SENT' ||
        s.type === 'M-PESA-WITHDRAW'
    );
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-content-primary">
          Messages
        </h1>
        <div>
          <button
            disabled
            type="button"
            className="h-8 py-3 px-2 flex items-center flex-row bg-background-neutral text-content-accent"
          >
            <GrFormFilter className="mr-2 font-semibold" />
            <span className="text-sm font-semibold">Filter</span>
          </button>
        </div>
      </div>
      <div>
        <div>
          <h5 className="text-content-secondary leading-[48px] font-semibold text-sm border-b">
            24 September 2022
          </h5>
          <div>
            {transactions.map((message, idx) => (
              <TransactionCard
                key={idx}
                title={
                  (message as any).recipient ||
                  (message as any).account ||
                  message.type
                }
                type={message.transactionType || 'No Type'}
                date={message.dateTime}
                amount={+message.amount || 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
