import Link from "next/link";
import { GrAdd } from "react-icons/gr";

export default function AccountCard({
  account,
  balance,
  href,
}: {
  account: string;
  balance: number;
  href: string;
}) {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  }).format(balance);
  return (
    <Link
      className="flex h-[170px] w-40 flex-[0_0_170px] flex-col justify-between overflow-hidden rounded-lg bg-background-neutral p-3"
      href={href}
    >
      <h2 className="text-base font-semibold text-primary">{account}</h2>
      <p className="overflow-hidden text-ellipsis text-lg font-semibold text-primary transition-all">
        {amount}
      </p>
    </Link>
  );
}

export function AddAccountCard({ href }: { href: string }) {
  return (
    <Link
      className="flex h-[170px] w-40 flex-[0_0_170px] flex-col justify-between rounded-lg bg-background-neutral p-3"
      href={href}
    >
      <div className="w-fit rounded-full bg-background-neutral p-2">
        <GrAdd className="text-content-primary" size={32} />
      </div>
      <p className="text-md font-semibold text-content-primary">Add Account</p>
    </Link>
  );
}
