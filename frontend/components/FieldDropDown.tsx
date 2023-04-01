import React, { useState } from "react";

type FieldDropDownProps = {
  values: string[];
  onSelected: (value: string) => void;
  type?: "primary" | "secondary";
};
function FieldDropDown({
  values,
  onSelected,
  type = "primary",
}: FieldDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(values[0] || "Select Value");
  const onValueSelected = (value: string) => {
    onSelected(value);
    setCurrentValue(value);
    setIsOpen(false);
  };
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={
        ` px-3 py-2 text-xs border w-[30%]
      rounded-full cursor-pointer flex flex-col gap-2 relative ` +
        (type == "primary"
          ? " bg-blue-100 text-blue-800 border-blue-400"
          : " bg-green-100 text-green-800 border-green-400")
      }
    >
      <div className="flex justify-between gap-2">
        <div>{currentValue}</div>
        <div>v</div>
      </div>

      <div
        className={
          ` rounded-md  flex-col gap-2 absolute top-10 left-0  
          w-full p-2 transition-all flex border ` +
          (!isOpen && "hidden") +
          " " +
          (type == "primary"
            ? " bg-blue-100 text-blue-800 border-blue-400"
            : " bg-green-100 text-green-800 border-green-400")
        }
      >
        {values.map((value, i) => (
          <div
            key={i}
            onClick={() => onValueSelected(value)}
            className="cursor-pointer hover:underline"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FieldDropDown;
