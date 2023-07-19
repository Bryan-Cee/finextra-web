import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import { FormInput } from "@/components/Form/FormInput";
import { Button } from "@/components/Button/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { RiLoader4Fill } from "react-icons/ri";
import { CheckIcon } from "@/components/CheckIcon";
import { z } from "zod";
import Dropdown from "@/components/Dropdown";
import { AssetType } from "@prisma/client";

const AssetsFormValues = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  unitPrice: z.number().min(0),
  quantity: z.number().min(0),
  type: z.object({
    value: z.nativeEnum(AssetType),
    label: z.nativeEnum(AssetType),
  }),
});

type AssetsFormValuesSchema = z.infer<typeof AssetsFormValues>;

const AddAsset = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<AssetsFormValuesSchema>();
  const goBack = router.back;
  const { data: assetTypes } = api.assetTypes.getAssetTypes.useQuery<
    unknown,
    { label: string }[]
  >();

  const assetOptions = assetTypes?.map((type) => ({
    value: type.label,
    label: type.label,
  }));

  const createAccount = api.assets.createAsset.useMutation();

  const handleClose = () => {
    goBack();
  };

  const onSubmit: SubmitHandler<AssetsFormValuesSchema> = (data) => {
    createAccount.mutate({
      title: data.title,
      description: data.description,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      type: data.type.value,
    });
  };

  return (
    <>
      <Head>
        <title>Fin-Extra | Add Asset</title>
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
            {createAccount.isIdle && "Add Asset"}
            {createAccount.isLoading && "Adding Asset..."}
            {createAccount.isSuccess && "Asset added successfully"}
            {createAccount.isError && "Adding asset failed"}
          </h1>
          {createAccount.isError && (
            <>
              <p>Error</p>
              <pre>
                <code>{JSON.stringify(createAccount.error)}</code>
              </pre>
            </>
          )}
          {createAccount.isSuccess && (
            <div className="flex items-center justify-center">
              <CheckIcon className="h-40 w-40 text-interactive-positive" />
            </div>
          )}
          {createAccount.isIdle && (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput id="title" label="Title" {...register("title")} />
                <FormInput
                  id="description"
                  label="Description"
                  {...register("description")}
                />
                <Dropdown<AssetsFormValuesSchema>
                  label="Asset Type"
                  name="type"
                  control={control}
                  options={assetOptions ?? []}
                />
                <FormInput
                  id="quantity"
                  label="Quantity"
                  type={"number"}
                  step=".001"
                  {...register("quantity", { valueAsNumber: true })}
                />
                <FormInput
                  id="unitPrice"
                  label="Unit Price"
                  step=".0001"
                  type={"number"}
                  {...register("unitPrice", { valueAsNumber: true })}
                />
                <Button type="submit" className="mt-6">
                  Add
                </Button>
              </form>
            </div>
          )}
          {createAccount.isLoading && (
            <div className="flex flex-col items-center justify-center">
              <RiLoader4Fill className="h-40 w-40 animate-loading text-content-accent" />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AddAsset;
