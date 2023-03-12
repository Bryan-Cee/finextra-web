import Head from "next/head";
import React, { type SVGProps } from "react";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import { Button } from "@/components/Button/Button";
import { FormInput } from "@/components/Form/FormInput";
import Dropdown from "@/components/Dropdown";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { type TransactionType } from "@prisma/client";
import DatePicker from "@/components/DatePicker";
import { motion } from "framer-motion";

type TransactionFormValues = {
  account: { value: string; label: string };
  amount: number;
  description: string;
  transactionType: { value: TransactionType; label: TransactionType };
  createdAt: Date;
};

const Transaction = () => {
  const { data: fundAccounts } = api.fundAccounts.getAll.useQuery();
  const { data: transactionTypes } =
    api.transactionTypes.getTransactionTypes.useQuery<
      unknown,
      { label: string }[]
    >();
  const createTransaction = api.transactions.createTransaction.useMutation();

  const router = useRouter();
  const { register, handleSubmit, control } = useForm<TransactionFormValues>();

  const fundAccountsOptions = fundAccounts?.map((account) => ({
    value: account.id,
    label: account.title,
  }));

  const transactionTypesOptions = transactionTypes?.map((type) => ({
    value: type.label,
    label: type.label,
  }));

  const goBack = router.back;

  const onSubmit: SubmitHandler<TransactionFormValues> = (data) => {
    data = { ...data, amount: Number(data.amount) };

    createTransaction.mutate({
      accountId: data.account.value,
      amount: data.amount,
      description: data.description,
      type: data.transactionType.value,
      createdAt: data.createdAt,
    });
  };

  return (
    <>
      <Head>
        <title>Fin-Extra | Add Transaction</title>
        <meta
          name="description"
          content="Home page for financial tracking web app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="grid h-screen grid-rows-[4rem_1fr] px-4">
        <div className="flex w-full items-center justify-end border-b border-b-border-neutral">
          <button className="h-fit" onClick={goBack}>
            <GrClose className="text-content-accent" size={24} />
          </button>
        </div>
        <main className={"mt-6 flex flex-1 flex-col"}>
          <h1 className="mt-2 mb-10 text-center text-2xl font-semibold text-content-primary">
            {createTransaction.isSuccess
              ? "Transaction added successfully"
              : "Add Transaction"}
          </h1>
          {createTransaction.isSuccess ? (
            <div className="flex items-center justify-center">
              <CheckIcon className="h-40 w-40 text-interactive-positive" />
            </div>
          ) : (
            <div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Dropdown<TransactionFormValues>
                    label="Account"
                    name="account"
                    control={control}
                    options={fundAccountsOptions ?? []}
                  />
                  <FormInput
                    id="amount"
                    type="number"
                    label="Amount"
                    {...register("amount")}
                  />
                  <Dropdown<TransactionFormValues>
                    label="Transaction Type"
                    name="transactionType"
                    control={control}
                    options={transactionTypesOptions ?? []}
                  />
                  <DatePicker<TransactionFormValues>
                    label="Date"
                    name="createdAt"
                    control={control}
                  />
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
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Transaction;

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, type: "tween", ease: "easeOut" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
