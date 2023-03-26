import Layout from "@/components/Layout";
import Loader from "@/components/Loaders/Loader";
import ROUTES from "@/routes";
import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";

const AccountLoader = () => (
  <div className="flex flex-col gap-2">
    <div className="skeleton h-8 w-4/5 rounded-lg" />
    <div className="skeleton h-6 w-3/5 rounded-lg" />
    <div className="skeleton mt-4 h-12 w-full rounded-lg" />
  </div>
);

const Asset = () => {
  return (
    <Layout>
      <main className={"mt-4 w-screen"}>
        <div className="mb-10 px-4">
          <Loader loader={<AccountLoader />} isLoading={false}>
            <div className="flex flex-col gap-2">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-[1.375rem] font-semibold text-black">
                    MSFT
                  </p>
                  <p>Asset Description</p>
                </div>
                <Link
                  role={"button"}
                  className="place-self-start"
                  href={{
                    pathname: ROUTES.ASSETS.ID,
                    query: {
                      id: "1",
                    },
                  }}
                >
                  <FiEdit
                    size="24px"
                    className="relative  text-content-tertiary"
                  />
                </Link>
              </div>
              <p className="overflow-hidden text-ellipsis text-[2rem] font-medium text-black">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(231232)}
              </p>
            </div>
          </Loader>
        </div>
      </main>
    </Layout>
  );
};

export default Asset;
