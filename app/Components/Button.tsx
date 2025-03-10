import type { ButtonProps } from "~/Types/interfaces";

function Button({ backgroundcolor = 'bg-blue-500', text, isrounded = false, onClick }: ButtonProps) {
  return (
    <button
      className={`${backgroundcolor} hover:${backgroundcolor.replace(/(\d{3})$/, (match) => `${Math.min(900, Number(match) + 100)}`)} 
        text-white font-bold ${isrounded ? "rounded-full px-5 py-2" : "rounded-none px-5 py-3"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
