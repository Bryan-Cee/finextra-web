import { api } from "@/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { type ReactElement } from "react";
import { Loading } from "@/components/Loaders/Loading";

function Auth({
  children,
  loading: LoadingComponent = Loading,
}: {
  loading?: React.FC;
  children: ReactElement;
}): ReactElement {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <LoadingComponent />;
  }

  return children;
}
export default Auth;

export const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex w-full flex-row items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
