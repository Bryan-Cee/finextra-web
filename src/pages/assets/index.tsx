import Layout from "@/components/Layout";
import Loader from "@/components/Loaders/Loader";
import ROUTES from "@/routes";
import { api } from "@/utils/api";
import { type Asset } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";

const Assets = () => {
  const { data } = api.assets.getAll.useQuery<unknown, Asset[]>();

  return (
    <Layout>
      <main className={"mt-4 "}>
        <div className="mb-10 px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-content-primary">
              Assets
            </h1>
            <Loader loader={<div />} isLoading={false}>
              <div className="mb-4 flex flex-col gap-2">
                <p>Asset Description</p>
                <p className="overflow-hidden text-ellipsis text-[2rem] font-medium text-black">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KES",
                  }).format(231232)}
                </p>
              </div>
              <Link
                href={{
                  pathname: ROUTES.ASSETS.ADD,
                }}
                className="flex w-fit items-center gap-3"
              >
                <div className="flex w-fit cursor-pointer items-center justify-center rounded-full bg-interactive-positive px-4 py-2">
                  <GrFormAdd size="24px" className=" text-white" />
                  <p className="font-medium text-white">Add Asset</p>
                </div>
              </Link>
            </Loader>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold text-content-primary">
              Asset Accounts
            </p>
            {data?.map((asset) => (
              <AssetCard key={asset?.id} data={asset} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

const AssetCard = ({ data }: { data: Asset }) => {
  return (
    <Link
      href={{
        pathname: ROUTES.ASSETS.ID,
        query: { id: data.id },
      }}
      className="flex flex-col gap-8 rounded-lg border border-border-neutral p-4"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex gap-2">
          <AiOutlineStock size={"24px"} />
          <p className="text-lg font-semibold text-primary">{data.title}</p>
        </div>
        <div className="rounded-full bg-content-tertiary px-3 py-1 text-sm font-medium text-white">
          {data.type}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <p className="text-xs">Amount</p>
          <p className="text-xl font-semibold text-black">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "KES",
            }).format(data.unitPrice * data.quantity)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Assets;
