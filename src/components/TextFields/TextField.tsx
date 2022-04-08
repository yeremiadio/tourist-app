import { FC, HTMLInputTypeAttribute } from "react";
import classNames from "../../utils/tailwindClassNames";

interface TextFieldProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  label: string;
  name?: string;
  helperText?: string;
  isError?: boolean;
  errorMessage?: string;
}

const TextField: FC<TextFieldProps> = (props) => {
  const {
    label,
    type,
    name,
    placeholder,
    helperText,
    isError,
    errorMessage,
    className,
    ...rest
  } = props;
  return (
    <div className="mt-4">
      <label
        className={classNames(
          "block mb-2 text-sm font-medium",
          isError ? "text-red-500" : "text-gray-900 text-opacity-50"
        )}
      >
        {label}
      </label>
      <input
        type={type ? type : "text"}
        name={name}
        className={classNames(
          "text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 transition-all delay-75 focus:ring-1 focus:border-blue-500 block w-full p-2.5",
          isError
            ? "border-2 border-red-500 bg-red-500 bg-opacity-5"
            : "border border-gray-300 bg-white focus:ring-blue-500 focus:ring-1 focus:border-blue-500",
          className
        )}
        placeholder={placeholder}
        required
        {...rest}
      />
      {isError ? (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-sm text-black-secondary text-opacity-50">
          {helperText}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextField;
