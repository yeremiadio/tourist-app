import { FC } from "react";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ label }) => {
  return (
    <input
      type="submit"
      value={label}
      className="px-6 py-2 font-semibold rounded-md transition-all delay-75 text-white hover:bg-blue-600 bg-blue-500"
    />
  );
};

export default SubmitButton;
