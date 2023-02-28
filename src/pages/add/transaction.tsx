import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import { Button } from "@/components/Button/Button";
import { FormInput } from "@/components/Form/FormInput";
import { Dropdown } from "@/components/Dropdown";

const Transaction = () => {
  const router = useRouter();
  const goBack = router.back;

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
        <div className="flex w-full items-center justify-end border-b border-b-border-neutral ">
          <button className="h-fit" onClick={goBack}>
            <GrClose className="text-content-accent" size={24} />
          </button>
        </div>
        <main className={"mt-6 flex flex-1 flex-col"}>
          <h1 className="mt-2 mb-10 text-center text-2xl font-semibold text-content-primary">
            Add Transaction
          </h1>
          <div>
            <div>
              <Dropdown />
              <FormInput id="amount" type="number" label="Amount" />
              <FormInput id="transaction-type" label="Transaction Type" />
              <FormInput id="description" label="Description" />
              <Button className="mt-6">Add</Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Transaction;
