import ROUTES from "@/routes";
import Link from "next/link";

export default function AccountCard({
  account,
  balance,
}: {
  account: string;
  balance: number;
}) {
  return (
    <Link
      className="bg-background-neutral flex h-32 w-40 flex-[0_0_fit-content] flex-col justify-between rounded p-3"
      href={ROUTES.ACCOUNT}
    >
      <h2 className="text-primary text-base font-semibold">{account}</h2>
      <p className="text-primary text-lg font-semibold">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "KES",
        }).format(balance)}
      </p>
    </Link>
  );
}
