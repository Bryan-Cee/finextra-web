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
import { type OAuthProviderType } from "next-auth/providers/oauth-types";
import Link from "next/link";
import ROUTES from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ILogin, LoginSchema } from "./sign-in";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { z } from "zod";
import { Button } from "@/components/Button/Button";
import { FormInput } from "@/components/Form/FormInput";

const Icons: Record<
  Extract<OAuthProviderType, "google" | "github">,
  React.ReactNode
> = {
  google: <FcGoogle size={48} />,
  github: <BsGithub size={48} />,
};

export const SignUpSchema = LoginSchema.extend({
  confirmPassword: z
    .string({
      description: "Confirm password",
      errorMap: () => ({
        message: `Password must be at least 8 characters`,
      }),
    })
    .min(8),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  params: {
    ref: "confirmPassword",
  },
  message: "Oops! Password doesn't match",
});

export type ISignUp = z.infer<typeof SignUpSchema>;

export default function SignUp({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm<ISignUp>({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   resolver: zodResolver(SignUpSchema),
  // });

  // const { mutateAsync } = api.auth.signUp.useMutation();

  // const onSubmit = async (data: ILogin) => {
  //   console.log({ data });
  //   try {
  //     const result = await mutateAsync(data);
  //     console.log(result);
  //     if (result.status === 201) {
  //       await router.push(ROUTES.ROOT);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
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
                Create your account
              </h2>
            </div>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                {...register("email")}
                type="email"
                label="Email"
                errormessage={errors.email?.message}
              />
              <FormInput
                {...register("password")}
                type="password"
                label="Password"
                autoComplete="password"
                errormessage={errors.password?.message}
              />

              <FormInput
                {...register("confirmPassword")}
                type="password"
                label="Confirm Password"
                errormessage={errors.confirmPassword?.message}
              />
              <Button className="mt-6" type="submit">
                Create Account
              </Button>
            </form>
            <p className="text-center text-sm text-content-primary">
              Or sign up with
            </p> */}
            <div className="flex items-center justify-center gap-4">
              {Object.values(providers).map((provider) => {
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
