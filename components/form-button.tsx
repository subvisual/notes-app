import { ButtonHTMLAttributes } from "react";
import { useStore, Theme } from "../lib/store";

type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
};

export default function FormButton({
  className = "",
  children,
  type,
  variant,
  ...otherProps
}: FormButtonProps) {
  const {
    preferences: { theme },
  } = useStore();

  const bgColor = theme === Theme.Dark ? "pistachio" : "green";
  const textColor = theme === Theme.Dark ? "dark-1" : "light-1";

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`rounded-md border-thin py-2 px-3 ${
        variant === "primary"
          ? `border-${bgColor} bg-${bgColor} text-${textColor}`
          : "border-current bg-transparent"
      } ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
