import "@/styles/globals.css";

import { type AppProps } from "next/app";
import { type Session } from "next-auth";
import { type NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { type ReactNode, type ReactElement } from "react";
import localFont from "@next/font/local";

import Auth from "@/components/Auth";
import { api } from "@/utils/api";

const Metropolis = localFont({
  src: [
    {
      path: "../assets/fonts/Metropolis-Black.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Metropolis-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Metropolis-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Metropolis-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Metropolis-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
});

export type NextPageWithAuthAndLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
  loading?: React.FC;
};

type AppPropsWithAuthAndLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithAuthAndLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuthAndLayout) => {
  return (
    <SessionProvider session={session}>
      <main className={Metropolis.className}>
        {Component.auth ? (
          <Auth loading={Component.loading}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
