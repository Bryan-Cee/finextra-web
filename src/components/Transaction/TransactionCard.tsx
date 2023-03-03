import { parseAmount, parseDate } from "@/utils";
import { type TransactionType } from "@prisma/client";
import Link from "next/link";
import { GiIsland, GiCash, GiPapers } from "react-icons/gi";

export type TransactionCardProps = {
  title: string;
  type: keyof typeof TransactionType;
  date: Date | number;
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
            {type === "CASH" && <GiCash size="24px" color="#37517e" />}
            {type === "LAND" && <GiIsland size="24px" color="#37517e" />}
            {type === "SHARE" && <GiPapers size="24px" color="#37517e" />}
          </div>
          <div>
            <p className="text-base font-semibold text-primary">{title}</p>
            <p className="text-sm font-normal text-secondary">
              <>
                <span className="capitalize">{type.toLocaleLowerCase()}</span> .{" "}
                {parseDate(date)}
              </>
            </p>
          </div>
        </div>
      </div>
      <div className="ml-2 flex items-start">
        <p className="font-semibold text-primary">{parseAmount(amount)}</p>
      </div>
    </Link>
  );
}
