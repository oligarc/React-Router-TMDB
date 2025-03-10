import { useState } from "react";
import type { TextInputProps } from "~/Types/interfaces";
import Favicon from "react-favicon";

function SearchInput({ name, placeholder, value, onChange,onKeyDown, textcolor }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-56 me-2">
      {!isFocused && (
        
        <img
          src="/search_icon_white.png"
          alt="Buscar"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
      )}
      <input
        type="text"
        className={`${textcolor} w-full p-1 placeholder-gray-500 placeholder:text-center placeholder:ps-2 border-2 border-${textcolor} ${
          value ? 'pl-7' : 'pl-2'
        }`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}

export default SearchInput;
