import ROUTES from "@/routes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { GrLinkPrevious, GrUser, GrDown } from "react-icons/gr";

const MainPages = [
  ROUTES.ROOT,
  ROUTES.SETTINGS,
  ROUTES.ASSETS.ROOT,
  ROUTES.MESSAGES,
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
  const { data } = useSession();
  const goBack = router.back;
  const user = data?.user;

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
          <button
            type="button"
            onClick={() => {
              toggleSidebar(!open);
            }}
            className="flex flex-row items-center gap-3"
          >
            <div className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full border border-content-accent bg-content-accent text-white">
              {user?.image ? (
                <Image
                  src={user.image}
                  width={42}
                  height={42}
                  alt="user-icons"
                  className="rounded-full"
                />
              ) : (
                <GrUser size={24} />
              )}
            </div>
            <GrDown className="text-content-accent" size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
