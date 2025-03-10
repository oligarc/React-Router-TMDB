import type { ButtonProps } from "~/Types/interfaces";

function Button({ backgroundcolor = 'bg-blue-500', text, isrounded = false, onClick,hover=500 }: ButtonProps) {
  return (
    <button
      className={`${backgroundcolor} hover:bg-${backgroundcolor}-${hover} text-white font-bold ${isrounded ? 'rounded-full px-5 py-2' : 'rounded-none px-5 py-3'}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
