import ROUTES from "@/routes";
// import { Session } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { GrLinkPrevious, GrUser, GrDown } from "react-icons/gr";

const MainPages = [
  ROUTES.HOME,
  ROUTES.SETTINGS,
  ROUTES.TRANSACTION,
  ROUTES.MESSAGES,
];

export default function Navbar({
  toggleSidebar,
  open,
  navHandler,
  session,
}: {
  navHandler: () => void;
  open: boolean;
  toggleSidebar: (o: boolean) => void;
  session: any;
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
          <button
            type="button"
            onClick={() => {
              toggleSidebar(!open);
            }}
            className="flex flex-row items-center gap-3"
          >
            <div className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full border border-content-accent bg-content-accent text-white">
              <GrUser size={24} />
            </div>
            <GrDown className="text-content-accent" size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
