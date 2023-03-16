import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import { Button } from "@/components/Button/Button";
import { FormInput } from "@/components/Form/FormInput";
import Dropdown from "@/components/Dropdown";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { TransactionType } from "@prisma/client";
import DatePicker from "@/components/DatePicker";
import { RiLoader4Fill } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckIcon } from "@/components/CheckIcon";

const TransactionFormValues = z.object({
  account: z.object({
    value: z.string(),
    label: z.string(),
  }),
  description: z.string().min(3),
  amount: z.number().min(0),
  transactionType: z.object({
    value: z.nativeEnum(TransactionType),
    label: z.nativeEnum(TransactionType),
  }),
  expenseDate: z.date(),
});

type TransactionFormSchema = z.infer<typeof TransactionFormValues>;

const EditTransaction = () => {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    setTransactionId(router.query.id as string);
  }, [router.query.id]);

  const { data: transaction } = api.transactions.getTransactionById.useQuery(
    { id: router.query.id as string },
    { enabled: !!transactionId }
  );
  const { data: account } = api.fundAccounts.getAccountById.useQuery(
    { id: transaction?.accountId as string },
    { enabled: !!transaction?.accountId }
  );

  const { data: fundAccounts } = api.fundAccounts.getAll.useQuery();
  const { data: transactionTypes } =
    api.transactionTypes.getTransactionTypes.useQuery<
      unknown,
      { label: string }[]
    >();

  const updateTransaction = api.transactions.updateTransaction.useMutation();
  const createTransactionHistory =
    api.transactionHistory.createTransactionHistory.useMutation({});

  const { register, handleSubmit, control } = useForm<TransactionFormSchema>({
    defaultValues: {
      account: {
        value: account?.id,
        label: account?.title,
      },
      description: transaction?.description,
      amount: Math.abs(transaction?.amount || 0),
      transactionType: {
        value: transaction?.type,
        label: transaction?.type,
      },
      expenseDate: transaction?.expense_date,
    },
    resolver: zodResolver(TransactionFormValues),
  });

  const fundAccountsOptions = fundAccounts?.map((account) => ({
    value: account.id,
    label: account.title,
  }));

  const transactionTypesOptions = transactionTypes?.map((type) => ({
    value: type.label,
    label: type.label,
  }));

  const goBack = router.back;

  const onSubmit: SubmitHandler<TransactionFormSchema> = (data) => {
    data = { ...data, amount: Number(data.amount) };

    createTransactionHistory.mutate({
      fundAccountId: account?.id as string,
      amount: transaction?.amount as number,
      description: transaction?.description as string,
      type: transaction?.type as TransactionType,
      expenseDate: transaction?.expense_date as Date,
      expense_date: transaction?.expense_date as Date,
      created_at: transaction?.created_at as Date,
      updated_at: transaction?.updated_at as Date,
      accountId: transaction?.accountId as string,
      transactionId: transaction?.id as string,
    });

    updateTransaction.mutate({
      accountId: data.account.value,
      amount: data.amount,
      description: data.description,
      type: data.transactionType.value,
      expenseDate: data.expenseDate,
      id: transaction?.id as string,
    });
  };

  return (
    <>
      <Head>
        <title>Fin-Extra | Edit Transaction</title>
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
            {updateTransaction.isIdle && "Edit Transaction"}
            {updateTransaction.isLoading &&
              "Logging edit history and updating transaction..."}
            {updateTransaction.isSuccess && "Transaction edited successfully"}
            {updateTransaction.isError && "Editing transaction failed"}
          </h1>
          {updateTransaction.isError && (
            <>
              <p>Error</p>
              <pre>
                <code>{JSON.stringify(updateTransaction.error)}</code>
              </pre>
            </>
          )}
          {updateTransaction.isSuccess && (
            <div className="flex items-center justify-center">
              <CheckIcon className="h-40 w-40 text-interactive-positive" />
            </div>
          )}
          {updateTransaction.isIdle && (
            <div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Dropdown<TransactionFormSchema>
                    label="Account"
                    name="account"
                    control={control}
                    options={fundAccountsOptions ?? []}
                  />
                  <FormInput
                    id="amount"
                    type="number"
                    label="Amount"
                    {...register("amount", { valueAsNumber: true })}
                  />
                  <Dropdown<TransactionFormSchema>
                    label="Transaction Type"
                    name="transactionType"
                    control={control}
                    options={transactionTypesOptions ?? []}
                  />
                  <DatePicker<TransactionFormSchema>
                    label="Date"
                    name="expenseDate"
                    control={control}
                  />
                  <FormInput
                    id="description"
                    label="Description"
                    {...register("description", {
                      required: true,
                      min: 3,
                    })}
                  />
                  <Button type="submit" className="mt-6">
                    Save
                  </Button>
                </form>
              </div>
            </div>
          )}
          {updateTransaction.isLoading && (
            <div className="flex flex-col items-center justify-center">
              <RiLoader4Fill className="h-40 w-40 animate-loading text-content-accent" />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default EditTransaction;
