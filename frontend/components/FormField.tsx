import React from "react";

type FormFieldProps = {
  label: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "singleline" | "multiline";
};

function FormField({ label, errorMessage, onChange, type }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-gray-500 font-light">{label}</div>
      {type == "multiline" ? (
        <textarea
          //   @ts-ignore
          onChange={onChange}
          className={
            `border border-gray-300 rounded-md px-4 py-2 focus:outline-none transition-all"
         focus:border-blue-300 bg-transparent h-[10vh]` +
            " " +
            (errorMessage ? "border-red-500" : "") +
            " "
          }
        />
      ) : (
        <input
          onChange={onChange}
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
