interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string;
  bgColor?: string;
}

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${className} flex w-full items-center justify-center rounded-[3px] px-6 py-3 text-base font-semibold ${
        props.bgColor || "bg-interactive-accent "
      } ${props.textColor || "text-white"}`}
      onClick={props.onClick}
    >
      {props.title || props.children}
    </button>
  );
}
