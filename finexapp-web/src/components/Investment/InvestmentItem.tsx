import { parseAmount, parseDate } from "@/utils";
import Link from "next/link";
import { MdArrowUpward } from "react-icons/md";
import { type Transaction } from "types";

export default function InvestmentItem({ account, date, type }: Transaction) {
  return (
    <Link
      href={{
        pathname: "/accounts/[id]",
        query: { id: "12345" },
      }}
      className="flex flex-row justify-between py-4"
    >
      <div className="">
        <div className="flex items-center">
          <div className="mr-2 rounded-full bg-background-neutral p-3">
            <MdArrowUpward size="24px" color="#37517e" />
          </div>
          <div>
            <p className="text-base font-semibold text-primary">{account}</p>
            <p className="text-sm font-normal text-secondary">
              <>
                <span className="capitalize">{type}</span> . {parseDate(date)}
              </>
            </p>
          </div>
        </div>
      </div>
      <div className="ml-2 flex items-start">
        <p className="font-semibold text-primary">{parseAmount(1)}</p>
      </div>
    </Link>
  );
}
