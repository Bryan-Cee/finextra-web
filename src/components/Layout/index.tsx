import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type ReactNode, useState } from "react";
import BottomNavbar from "../Navigation/BottomNavbar";
import Navbar from "../Navigation/Navbar";
import SideNav from "../Navigation/SideNav";

export default function Layout({
  children,
  showHeaderNav = true,
  showBottomNav = true,
  goBack,
}: {
  showHeaderNav?: boolean;
  showBottomNav?: boolean;
  goBack?: () => void;
  children: ReactNode;
}) {
  const router = useRouter();

  if (!goBack) {
    goBack = router.back;
  }
  const session = useSession({ required: true });
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <meta name="description" content="Financial Tracking Web App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`grid h-screen grid-rows-[1fr_4rem]`}>
        {session.status === "authenticated" && showBottomNav && (
          <div className="fixed inset-x-0 bottom-0 row-start-2 row-end-3 flex h-16 items-center border-t bg-white">
            <BottomNavbar />
          </div>
        )}
        <div className="row-start-1 row-end-2 pb-[48px]">
          {session.status === "authenticated" && showHeaderNav && (
            <div className="relative h-16">
              <Navbar open={open} toggleSidebar={setOpen} />
              {open && (
                <SideNav user={session.data?.user} toggleSidebar={setOpen} />
              )}
            </div>
          )}
          {session.status === "authenticated" && (
            <div className="">{children}</div>
          )}
        </div>
      </div>
    </>
  );
}
