import { type InferGetServerSidePropsType } from "next";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { type OAuthProviderType } from "next-auth/providers/oauth-types";
import Link from "next/link";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Logo from "@/assets/img/logo.png";
import { authOptions } from "@/server/auth";
import { FormInput } from "@/components/Form/FormInput";
import { Button } from "@/components/Button/Button";
import ROUTES from "@/routes";
import { api } from "@/utils/api";

export const LoginSchema = z.object({
  email: z
    .string({
      description: "Email",
      errorMap: () => ({
        message: `Email must be a valid email address`,
      }),
    })
    .email(),
  password: z.string().min(8),
});

export type ILogin = z.infer<typeof LoginSchema>;

const Icons: Record<
  Extract<OAuthProviderType, "google" | "github">,
  React.ReactNode
> = {
  google: <FcGoogle size={48} />,
  github: <BsGithub size={48} />,
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { handleSubmit, register } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const { mutateAsync } = api.auth.login.useMutation();

  const onSubmit = (data: ILogin) => {
    console.log(data);
    // try {
    //   const result = await mutateAsync(data);
    //   console.log(result);
    //   if (result?.status === 201) {
    //     await router.push(ROUTES.ROOT);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <>
      <Head>
        <title>Fin-Extra | Login</title>
        <meta name="description" content="Financial Tracking Web App" />
        <meta
          name="description"
          content="Login page for financial tracking web app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="grid min-h-screen grid-rows-[70px_1fr] p-3">
        <div className="flex items-center justify-center border-b border-border-neutral pb-3">
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
                Welcome Back
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput {...register("email")} type="email" label="Email" />
              <FormInput
                {...register("password")}
                type="password"
                label="Password"
                autoComplete="password"
              />
              <Button className="mt-6" type="submit">
                Log In
              </Button>
            </form>

            <p className="text-center text-sm text-content-primary">
              Or login in with
            </p>

            <div className="flex items-center justify-center gap-4">
              {Object.values(providers || {}).map((provider) => {
                if (provider.id === "credentials") return null;
                return (
                  <button
                    className="rounded border border-border-overlay py-2 px-5"
                    onClick={() => void signIn(provider.id)}
                    key={provider.name}
                  >
                    {Icons[provider.id as "github" | "google"]}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-sm text-content-primary">
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.SIGN_UP} className="text-content-accent">
                Sign Up
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
