import Layout from "@/components/Layout";
import Loader from "@/components/Loaders/Loader";
import ROUTES from "@/routes";
import { parseAmount } from "@/utils";
import Link from "next/link";
import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { TiArrowSortedUp } from "react-icons/ti";

const Assets = () => {
  return (
    <Layout>
      <main className={"mt-4 w-screen"}>
        <div className="mb-10 px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-content-primary">
              Assets
            </h1>
            <Loader loader={<div />} isLoading={false}>
              <div className="flex flex-col gap-2">
                <p>Asset Description</p>
                <p className="overflow-hidden text-ellipsis text-[2rem] font-medium text-black">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KES",
                  }).format(231232)}
                </p>
              </div>
            </Loader>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold text-content-primary">
              Asset Accounts
            </p>
            <AssetCard id="2ewfvv3qafsvfdbfet" />
          </div>
        </div>
      </main>
    </Layout>
  );
};

const AssetCard = ({ id }: { id: string }) => {
  return (
    <Link
      href={{
        pathname: ROUTES.ASSETS.ID,
        query: { id },
      }}
      className="flex flex-col gap-8 rounded-lg border border-border-neutral p-4"
    >
      <div className="flex flex-row justify-between">
        <div className="flex gap-2">
          <AiOutlineStock size={"24px"} />
          <p className="text-lg font-semibold text-primary">MSFT Stocks</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <p className="text-xs">Amount</p>
          <p className="text-xl font-semibold text-black">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "KES",
            }).format(212098)}
          </p>
        </div>
        <div className="flex flex-col items-end justify-center">
          <p className="text-xs">Profit</p>
          <p className="m-auto flex flex-row items-center justify-center gap-2 text-base">
            <TiArrowSortedUp size="16px" className="text-content-positive" />
            <span className="text-content-positive">3.4%</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Assets;
