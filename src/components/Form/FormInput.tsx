interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function FormInput({ label, ...props }: FormInputProps) {
  return (
    <div className="mb-2 flex flex-col">
      {label && (
        <label className="text-sm text-content-secondary" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={`${props.className ?? ""} min-h-[48px] border py-3 px-4`}
        {...props}
      />
    </div>
  );
}
