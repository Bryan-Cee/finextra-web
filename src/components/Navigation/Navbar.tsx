import ROUTES from "@/routes";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React from "react";
import { GrLinkPrevious } from "react-icons/gr";

const MainPages = [
  ROUTES.ROOT,
  ROUTES.SETTINGS,
  ROUTES.ASSETS.ROOT,
  ROUTES.ACCOUNT.ROOT,
  ROUTES.TRANSACTIONS.ROOT,
  ROUTES.NEW_USER,
];

export default function Navbar({
  toggleSidebar,
  open,
}: {
  open: boolean;
  toggleSidebar: (o: boolean) => void;
}) {
  const router = useRouter();
  const goBack = router.back;

  return (
    <nav className="flex h-full w-full items-center px-4">
      <ul className="flex flex-1 flex-row items-center justify-between">
        <li>
          {!MainPages.includes(router.pathname) && (
            <button onClick={goBack}>
              <GrLinkPrevious className="text-content-accent" size={24} />
            </button>
          )}
        </li>
        <li>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-[42px] w-[42px]",
                userButtonPopoverCard: "bg-white shadow-lg",
                userButtonPopoverActionButton:
                  "text-gray-700 hover:bg-gray-100",
              },
            }}
          />
        </li>
      </ul>
    </nav>
  );
}
