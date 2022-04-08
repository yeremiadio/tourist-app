import { FC, ReactNode } from "react";
import classNames from "../../utils/tailwindClassNames";
import Spinner from "../Spinner";

type ButtonBgColors = "blue-primary" | "black-secondary";
interface ButtonProps {
  children: ReactNode;
  bgColor: ButtonBgColors;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

const Button: FC<ButtonProps> = (props) => {
  const { children, bgColor, disabled, isLoading, className, ...rest } = props;
  return (
    <button
      className={classNames(
        "px-6 py-[9px] font-medium text-base rounded-lg transition-all delay-75 flex items-center justify-center",
        `bg-${bgColor} hover:bg-opacity-80 disabled:opacity-50 disabled:bg-opacity-100`,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
