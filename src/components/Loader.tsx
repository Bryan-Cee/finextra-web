import React, { type ReactNode } from "react";
import { RiLoader4Fill } from "react-icons/ri";

const Loader = ({
  children,
  isLoading,
}: {
  isLoading: boolean;
  children: ReactNode;
}) => {
  return isLoading ? (
    <div>
      <div className="flex flex-col items-center justify-center">
        <RiLoader4Fill className="h-40 w-40 animate-loading text-content-accent" />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loader;
