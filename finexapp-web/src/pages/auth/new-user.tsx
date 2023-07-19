import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FormInput } from "@/components/Form/FormInput";
import { Button } from "@/components/Button/Button";

const NewUser = () => {
  const [userName, setUserName] = useState("");
  const { data } = useSession();

  useEffect(() => {
    if (data?.user.name) {
      setUserName(data?.user.name);
    }
  }, [data]);

  const onSubmit = (data: React.FormEvent) => {
    data.preventDefault();
    console.log(userName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault();
    setUserName(e?.target.value);
  };

  return (
    <main className="h-screen">
      <div className="px-4">
        <div className="pt-6">
          <div className="mb-4">
            <h1 className="relative box-content flex max-w-sm flex-col text-center text-2xl font-medium">
              Welcome, {userName}!
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="relative w-fit overflow-hidden  rounded-full bg-accent">
              {data?.user.image ? (
                <Image
                  src={data?.user.image || ""}
                  alt="Avatar"
                  width={180}
                  height={180}
                />
              ) : null}
            </div>
          </div>
          <div className="mt-4">
            <FormInput value={userName} onChange={handleChange} label="Name" />
            <Button onClick={onSubmit} className="mt-6" title="Save" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewUser;
