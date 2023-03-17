import { parseAmount, parseDate } from "@/utils";
import { type TransactionType } from "@prisma/client";
import Link from "next/link";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";

export type TransactionCardProps = {
  title: string;
  type: keyof typeof TransactionType;
  date: Date;
  amount: number;
  id: string;
};

export default function TransactionCard({
  title,
  type,
  date,
  amount,
  id,
}: TransactionCardProps) {
  return (
    <Link
      href={{
        pathname: "/transactions/[id]",
        query: { id },
      }}
      className="flex flex-row justify-between py-4"
    >
      <div className="">
        <div className="flex items-center">
          <div className="mr-2 rounded-full bg-background-neutral p-3">
            {type === "DEPOSIT" && <GiPayMoney size="24px" color="#37517e" />}
            {type === "INTEREST" && (
              <GiReceiveMoney size="24px" color="#37517e" />
            )}
            {type === "WITHDRAW" && (
              <GiTakeMyMoney size="24px" color="#37517e" />
            )}
          </div>
          <div>
            <p className="text-base font-semibold text-primary">
              {title || type}
            </p>
            <p className="text-sm font-normal text-black">
              <>
                <span className="capitalize">{type.toLocaleLowerCase()}</span> .{" "}
                {parseDate(date)}
              </>
            </p>
          </div>
        </div>
      </div>
      <div className="ml-2 flex items-start">
        <p
          className={`font-semibold ${
            amount < 0 ? "text-content-negative" : "text-content-positive"
          }`}
        >
          {parseAmount(Math.abs(amount))}
        </p>
      </div>
    </Link>
  );
}
