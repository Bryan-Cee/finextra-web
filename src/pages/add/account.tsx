import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import { FormInput } from "@/components/Form/FormInput";
import { Button } from "@/components/Button/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";

type AccountFormValues = {
  account: string;
  description: string;
};

const Account = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<AccountFormValues>();
  const goBack = router.back;
  const createAccount = api.accounts.createTransaction.useMutation({});

  const handleClose = () => {
    goBack();
  };

  const onSubmit: SubmitHandler<AccountFormValues> = (data) => {
    createAccount.mutate({
      title: data.account,
    });
  };

  return (
    <>
      <Head>
        <title>Fin-Extra | Add Account</title>
        <meta
          name="description"
          content="Home page for financial tracking web app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="grid h-screen grid-rows-[4rem_1fr] px-4">
        <div className="flex w-full items-center justify-end border-b border-b-border-neutral">
          <button className="h-fit" onClick={handleClose}>
            <GrClose className="text-content-accent" size={24} />
          </button>
        </div>
        <main className={"mt-6 flex flex-1 flex-col"}>
          <h1 className="mt-2 mb-10 text-center text-2xl font-semibold text-content-primary">
            Add Transaction
          </h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput id="account" label="Title" {...register("account")} />
              <FormInput
                id="description"
                label="Description"
                {...register("description")}
              />
              <Button type="submit" className="mt-6">
                Add
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Account;
