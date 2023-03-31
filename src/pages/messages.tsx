import Layout from "@/components/Layout";
import React from "react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

const Messages = () => {
  return (
    <Layout>
      <main className="mt-4">
        <div className="px-4">
          <div className="h-app flex flex-col items-center justify-center">
            <HiOutlineWrenchScrewdriver size={100} className="text-primary" />
            <div className="mt-3 text-primary">Messages not Implemented</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Messages;
