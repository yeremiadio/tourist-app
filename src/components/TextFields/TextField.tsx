import { FC, HTMLInputTypeAttribute } from "react";

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
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        name={name}
        className={
          className +
          ` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 transition-all delay-75 focus:ring-1 focus:border-blue-500 block w-full p-2.5`
        }
        placeholder={placeholder}
        required
        {...rest}
      />
    </div>
  );
};

export default TextField;
