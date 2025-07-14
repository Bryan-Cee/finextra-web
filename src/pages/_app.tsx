import "@/styles/globals.css";
import "react-widgets/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "@/utils/api";
import { Metropolis } from "@/assets/fonts";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    //@ts-ignore
    <ClerkProvider {...pageProps} afterSignOutUrl={"/"}>
      <main className={`${Metropolis.className} mx-auto max-w-lg bg-white`}>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
