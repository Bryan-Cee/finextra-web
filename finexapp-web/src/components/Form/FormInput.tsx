import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errormessage?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  function FormInputElement({ label, errormessage, ...props }, ref) {
    return (
      <div className="mb-2 flex flex-col">
        {label && (
          <label className="text-sm text-content-secondary" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          className={`${
            props.className ?? ""
          } min-h-[48px] rounded-sm border py-3 px-2.5 text-content-primary`}
          {...props}
          ref={ref}
        />
        {errormessage && (
          <span className="mt-1 text-sm text-interactive-negative">
            {errormessage}
          </span>
        )}
      </div>
    );
  }
);
