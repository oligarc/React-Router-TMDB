import type { ButtonProps } from "~/Types/interfaces"

function Button({backgroundcolor = 'bg-blue-500',text,isrounded= false} : ButtonProps) {
  return (
    <button className={`${backgroundcolor} text-white font-bold ${isrounded ? 'rounded-full px-5 py-2' : 'rounded-none px-5 py-3'}`}>{text}</button>
  )
}

export default Button