import React, { type ReactNode } from "react";
import { RiLoader4Fill } from "react-icons/ri";

type TLoader = {
  isLoading: boolean;
  children: ReactNode;
  loader?: ReactNode;
  count?: number;
};

const Loader = ({
  children,
  isLoading,
  count = 1,
  loader = (
    <RiLoader4Fill className="h-40 w-40 animate-loading text-content-accent" />
  ),
}: TLoader) => {
  const elements = [];

  for (let index = 0; index < count; index++) {
    elements.push(<React.Fragment key={index}>{loader}</React.Fragment>);
  }

  return isLoading ? <div>{elements}</div> : <>{children}</>;
};

export default Loader;
