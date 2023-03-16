import React from "react";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";

export const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-500">
      <div className="animate-pulse">
        <Image src={Logo} alt="Logo" className="h-32 w-32" />
      </div>
    </div>
  );
};
