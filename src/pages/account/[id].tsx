import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React from "react";

const Account = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <Layout>
      <main className={"mt-4 w-screen"}>
        <div className="px-4">
          <div>Account</div>
        </div>
      </main>
    </Layout>
  );
};

export default Account;
