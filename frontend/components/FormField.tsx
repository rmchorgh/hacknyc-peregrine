import React, { useState } from "react";

type FormFieldProps = {
  label: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "singleline" | "multiline";
  value: string;
};

function FormField({
  label,
  errorMessage,
  onChange,
  type,
  value,
}: FormFieldProps) {
  const [currentValue, setCurrentValue] = useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    onChange(e);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-gray-500 font-light">{label}</div>
      {type == "multiline" ? (
        <textarea
          //   @ts-ignore
          onChange={handleOnChange}
          className={
            `border border-gray-300 rounded-md px-4 py-2 focus:outline-none transition-all"
         focus:border-blue-300 bg-transparent h-[10vh]` +
            " " +
            (errorMessage ? "border-red-500" : "") +
            " "
          }
          value={value}
        />
      ) : (
        <input
          value={value}
          onChange={handleOnChange}
          className={
            `border border-gray-300 rounded-md px-4 py-2 focus:outline-none transition-all"
       focus:border-blue-300 bg-transparent` +
            " " +
            (errorMessage ? "border-red-500" : "") +
            " "
          }
        />
      )}
      {errorMessage && (
        <div className="text-red-500 text-sm font-light">{errorMessage}</div>
      )}
    </div>
  );
}

export default FormField;
