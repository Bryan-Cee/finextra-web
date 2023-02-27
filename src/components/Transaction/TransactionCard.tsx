import { parseAmount, parseDate } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdArrowUpward } from "react-icons/md";

export type TransactionCardProps = {
  title: string;
  type: string;
  date: Date | number;
  amount: number;
};

export default function TransactionCard({
  title,
  type,
  date,
  amount,
}: TransactionCardProps) {
  return (
    <Link
      href={{
        pathname: "/transactions/[id]",
        query: { id: "12345" },
      }}
      className="flex flex-row justify-between py-4"
    >
      <div className="">
        <div className="flex items-center">
          <div className="bg-background-neutral mr-2 rounded-full p-3">
            <MdArrowUpward size="24px" color="#37517e" />
          </div>
          <div>
            <p className="text-primary text-base font-semibold">{title}</p>
            <p className="text-secondary text-sm font-normal">
              <>
                <span className="capitalize">{type}</span> . {parseDate(date)}
              </>
            </p>
          </div>
        </div>
      </div>
      <div className="ml-2 flex items-start">
        <p className="text-primary font-semibold">{parseAmount(amount)}</p>
      </div>
    </Link>
  );
}
