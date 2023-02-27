import { parseAmount, parseDate } from '@/utils';
import Link from 'next/link';
import { MdArrowUpward } from 'react-icons/md';
import { Transaction } from 'types';

export default function InvestmentItem({
  account,
  date,
  type,
  amount,
  description,
}: Transaction) {
  return (
    <Link
      href={{
        pathname: '/accounts/[id]',
        query: { id: '12345' },
      }}
      className="flex flex-row justify-between py-4"
    >
      <div className="">
        <div className="flex items-center">
          <div className="bg-background-neutral rounded-full p-3 mr-2">
            <MdArrowUpward size="24px" color="#37517e" />
          </div>
          <div>
            <p className="font-semibold text-base text-primary">{account}</p>
            <p className="text-sm font-normal text-secondary">
              <>
                <span className="capitalize">{type}</span> . {parseDate(date)}
              </>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start ml-2">
        <p className="font-semibold text-primary">{parseAmount(amount)}</p>
      </div>
    </Link>
  );
}
