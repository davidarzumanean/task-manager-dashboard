import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "text";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  variant = "primary",
  type = "button",
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition cursor-pointer focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
    secondary:
      "border border-border bg-surface text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
    text: "text-slate-600 hover:text-slate-900 hover:bg-slate-50 focus:ring-slate-400",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
