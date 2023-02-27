import ROUTES from "@/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { type ReactNode } from "react";
import {
  GrTransaction,
  GrHomeRounded,
  GrSettingsOption,
  GrHistory,
  GrFormAdd,
} from "react-icons/gr";

export function NavItem({
  title,
  icon,
  href,
  actionButton,
}: {
  title: string;
  icon: ReactNode;
  href: string;
  actionButton?: boolean;
}) {
  const router = useRouter();
  const activeColor =
    router.pathname === href ? "text-content-accent" : "text-primary";
  return (
    <li className="flex flex-[0_1_82px] justify-center">
      <Link
        className={`flex h-full flex-[0_0_100%] flex-col items-center justify-center`}
        href={href}
      >
        <span
          className={`${activeColor} ${
            actionButton
              ? 'before:content-[" "] relative -top-3 -mt-8 flex w-full justify-center p-4 before:absolute before:top-4 before:z-10 before:h-12 before:w-12 before:rounded-full before:border before:border-[#e5e7eb] before:bg-interactive-positive'
              : ""
          }`}
        >
          {icon}
        </span>
        <span
          className={`${activeColor} w-full flex-[0_0_auto] pt-1 text-center text-[10px]`}
        >
          {title}
        </span>
      </Link>
    </li>
  );
}

export default function BottomNavbar() {
  return (
    <nav className="flex h-full w-full justify-center">
      <ul className="relative flex h-full flex-[0_1_414px] flex-row justify-start">
        <NavItem
          icon={<GrHomeRounded size="24px" />}
          title="Home"
          href={ROUTES.HOME}
        />
        <NavItem
          icon={<GrTransaction size="24px" />}
          title="Transaction"
          href={ROUTES.TRANSACTION}
        />
        <NavItem
          icon={
            <GrFormAdd
              size="24px"
              className="relative top-[11px] z-10 text-white"
            />
          }
          title="Add"
          href={ROUTES.ADD_TRANSACTION}
          actionButton
        />
        <NavItem
          icon={<GrSettingsOption size="24px" />}
          title="Settings"
          href={ROUTES.SETTINGS}
        />
        <NavItem
          icon={<GrHistory size="24px" />}
          title="Profile"
          href={ROUTES.PROFILE}
        />
      </ul>
    </nav>
  );
}
