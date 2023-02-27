interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function FormInput({ label, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col mb-2">
      {label && (
        <label className="text-content-secondary text-sm" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={`${props.className} border min-h-[48px] py-3 px-4`}
        {...props}
      />
    </div>
  );
}
