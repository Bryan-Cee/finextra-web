/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Link from "next/link";
import React from "react";
import {
  GrLinkPrevious,
  GrSettingsOption,
  GrUserSettings,
} from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import Router from "next/router";
import ROUTES from "@/routes";

import { signOut } from "next-auth/react";
const SideNav = ({
  toggleSidebar,
  user,
}: {
  toggleSidebar: (o: boolean) => void;
  user: any;
}) => {
  const closeSidebar = () => toggleSidebar(false);

  return (
    <div className="fixed inset-0 z-10 h-screen w-screen animate-[listSlideOver_.15s_ease-out_forwards] overflow-hidden bg-white">
      <div className="flex h-16 items-center px-4">
        <button type="button" onClick={closeSidebar}>
          <GrLinkPrevious className="text-content-accent" size={24} />
        </button>
      </div>
      <div className="px-2">
        <h1 className="block overflow-hidden text-ellipsis whitespace-nowrap px-5 text-2xl font-semibold uppercase text-content-primary">
          {user.name}
        </h1>
        <span className="px-5 text-sm font-normal text-content-secondary">
          {user.email ?? "No email"}
        </span>
        <ul className="my-4 border-t border-b py-2">
          <li className="px-5">
            <Link
              onClick={closeSidebar}
              className="flex flex-row gap-6 py-3 px-1"
              href={ROUTES.MESSAGES}
            >
              <GrUserSettings className="text-content-accent" size={24} />
              <span className="text-base font-semibold text-content-primary">
                Your details
              </span>
            </Link>
          </li>
          <li className="px-5">
            <Link
              onClick={closeSidebar}
              className="flex flex-row gap-6 py-3 px-1"
              href={ROUTES.SETTINGS}
            >
              <GrSettingsOption className="text-content-accent" size={24} />
              <span className="text-base font-semibold text-content-primary">
                Settings
              </span>
            </Link>
          </li>
          <li className="px-5">
            <button
              onClick={() => {
                signOut()
                  .then(async () => {
                    closeSidebar();

                    await Router.push("/auth/sign-in");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="flex w-full flex-row gap-6 py-3 px-1"
            >
              <FiLogOut className="text-content-accent" size={24} />
              <span className="text-base font-semibold text-content-primary">
                Log out
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
