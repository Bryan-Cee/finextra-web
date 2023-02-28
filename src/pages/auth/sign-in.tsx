import { type InferGetServerSidePropsType } from "next";
import type { GetServerSidePropsContext } from "next";
import { getProviders, signIn } from "next-auth/react";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      {Object.values(providers).map((provider) => (
        <div className="" key={provider.name}>
          <button
            className="rounded bg-slate-400 py-3 px-5"
            onClick={() => void signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
