import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import { FormInput } from "@/components/Form/FormInput";
import { Button } from "@/components/Button/Button";

const Account = () => {
  const router = useRouter();
  const goBack = router.back;

  const handleClose = () => {
    console.log("close");
    goBack();
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
        <div className="flex w-full items-center justify-end">
          <button className="h-fit" onClick={handleClose}>
            <GrClose className="text-content-accent" size={24} />
          </button>
        </div>
        <main className={"mt-4 flex flex-1 flex-col"}>
          <h1 className="mb-2 text-2xl font-semibold text-content-primary">
            Add Account
          </h1>
          <div>
            <div>
              <FormInput id="account" label="Title" />
              <FormInput id="description" label="Description" />
              <Button className="mt-6">Add</Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Account;
