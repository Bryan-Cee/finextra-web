import { useUser } from "@clerk/nextjs";
import { type ReactElement } from "react";
import { Loading } from "@/components/Loaders/Loading";

function Auth({
  children,
  loading: LoadingComponent = Loading,
}: {
  loading?: React.FC;
  children: ReactElement;
}): ReactElement {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingComponent />;
  }

  if (!isSignedIn) {
    return <div>Please sign in to access this page</div>;
  }

  return children;
}

export default Auth;
