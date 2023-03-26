import { type InferGetServerSidePropsType } from "next";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import { authOptions } from "@/server/auth";
import Image from "next/image";
import { getServerSession } from "next-auth";
import Logo from "@/assets/img/logo.png";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { FormInput } from "@/components/Form/FormInput";
import { type OAuthProviderType } from "next-auth/providers/oauth-types";
import { Button } from "@/components/Button/Button";
import Link from "next/link";
import ROUTES from "@/routes";

const Icons: Record<
  Extract<OAuthProviderType, "google" | "github">,
  React.ReactNode
> = {
  google: <FcGoogle size={48} />,
  github: <BsGithub size={48} />,
};

export default function SignUp({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(providers);
  return (
    <>
      <Head>
        <title>Fin-Extra | Sign up</title>
        <meta name="description" content="Financial Tracking Web App" />
        <meta
          name="description"
          content="Sign up page for financial tracking web app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="grid min-h-screen grid-rows-[70px_1fr] p-3">
        <div className="flex items-center border-b border-border-neutral pb-3">
          <Image
            src={Logo}
            width={50}
            height={50}
            alt="user-icons"
            className="rounded-full"
          />
        </div>
        <div className="mt-10">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="mb-2 text-center text-2xl font-semibold leading-8 text-primary">
                Create your account
              </h2>
            </div>

            <form className="" action="">
              <FormInput type="email" label="Email" />
              <FormInput
                type="password"
                label="Password"
                autoComplete="password"
              />
              <FormInput type="password" label="Confirm Password" />
              <Button className="mt-6" type="submit">
                Create Account
              </Button>
            </form>
            <p className="text-center text-sm text-content-primary">
              Or sign up with
            </p>
            <div className="flex items-center justify-center gap-4">
              {Object.values(providers).map((provider) => (
                <button
                  className="rounded border border-border-overlay py-2 px-5"
                  onClick={() => void signIn(provider.id)}
                  key={provider.name}
                >
                  {Icons[provider.id as "github" | "google"]}
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-content-primary">
              Have an account?{" "}
              <Link href={ROUTES.SIGN_IN} className="text-content-accent">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
