import { useUser } from "@clerk/nextjs";
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
  const { isLoaded, isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <meta name="description" content="Financial Tracking Web App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`grid min-h-screen grid-rows-[1fr_4rem]`}>
        {isLoaded && isSignedIn && showBottomNav && (
          <div className="fixed inset-x-0 bottom-0 row-start-2 row-end-3 mx-auto flex h-16 max-w-lg items-center border-t bg-white">
            <BottomNavbar />
          </div>
        )}
        <div className="row-start-1 row-end-2 w-screen max-w-lg pb-[48px]">
          {isLoaded && isSignedIn && showHeaderNav && (
            <>
              <div className="relative h-16">
                <Navbar open={open} toggleSidebar={setOpen} />
                {open && <SideNav user={user} toggleSidebar={setOpen} />}
              </div>
              <hr className="mx-auto mb-4 h-0 w-full border-border-neutral" />
            </>
          )}
          {isLoaded && isSignedIn && <div className="">{children}</div>}
        </div>
      </div>
    </>
  );
}
