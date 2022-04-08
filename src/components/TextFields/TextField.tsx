import { FC, HTMLInputTypeAttribute } from "react";
import classNames from "../../utils/tailwindClassNames";

interface TextFieldProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  label: string;
  name?: string;
}

const TextField: FC<TextFieldProps> = (props) => {
  const { label, type, name, placeholder, className, ...rest } = props;
  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 text-opacity-50">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        name={name}
        className={classNames(
          "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 transition-all delay-75 focus:ring-1 focus:border-blue-500 block w-full p-2.5",
          className
        )}
        placeholder={placeholder}
        required
        {...rest}
      />
    </div>
  );
};

export default TextField;
