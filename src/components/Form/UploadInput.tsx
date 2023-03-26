import React from "react";
import { GrTrash } from "react-icons/gr";
import { Button } from "../Button/Button";

interface UploadInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  size?: number;
}

const UploadInput = ({
  onChange,
  disabled,
  label,
  type,
  id,
  accept,
}: UploadInputProps) => {
  return (
    <div className={`mt-2 flex w-full flex-row gap-2`}>
      <div className="flex max-w-xs flex-1 items-center justify-center rounded-[3px] bg-content-primary px-6 py-2 font-semibold text-white">
        <label className="" htmlFor={id}>
          {label}
        </label>
        <input
          style={{
            width: 0,
            visibility: "hidden",
          }}
          type={type}
          id={id}
          accept={accept}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div className={`max-w-xs`}>
        <Button
          className="flex h-full flex-row justify-center gap-4"
          bgColor="bg-interactive-negative"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <GrTrash size={16} />
        </Button>
      </div>
    </div>
  );
};

export default UploadInput;
