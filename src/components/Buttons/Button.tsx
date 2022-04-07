import { MouseEventHandler, FC, ReactNode } from "react";
import Spinner from "../Spinner";

type ButtonBgColors = "blue-primary" | "black-secondary";

interface ButtonProps {
  children: ReactNode;
  bgColor: ButtonBgColors;
  className?: string;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, bgColor, isLoading, className, onClick, ...rest } = props;
  return (
    <button
      {...rest}
      onClick={onClick}
      className={
        "px-6 py-2 font-semibold rounded-md transition-all delay-75 " +
        `bg-${bgColor} ` +
        className
      }
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
