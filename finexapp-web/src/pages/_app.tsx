import "@/styles/globals.css";
import "react-widgets/styles.css";

import { type AppProps } from "next/app";
import { type Session } from "next-auth";
import { type NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { type ReactNode, type ReactElement } from "react";

import Auth from "@/components/Auth";
import { api } from "@/utils/api";
import { Metropolis } from "@/assets/fonts";

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
      <main className={`${Metropolis.className} mx-auto max-w-lg bg-white`}>
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
