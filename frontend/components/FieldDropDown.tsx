import React, { useState } from "react";

type FieldDropDownProps = {
  values: string[];
  onSelected: (value: string) => void;
};
function FieldDropDown({ values, onSelected }: FieldDropDownProps) {
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
      className="bg-blue-100 px-3 py-2 text-xs border text-blue-800  w-[30%]
     border-blue-400 rounded-full cursor-pointer flex flex-col gap-2 relative"
    >
      <div className="flex justify-between gap-2">
        <div>{currentValue}</div>
        <div>v</div>
      </div>

      <div
        className={
          `bg-blue-100 border border-blue-400  rounded-md  flex-col gap-2
      absolute top-10 left-0  w-full p-2 transition-all flex ` + (!isOpen && "hidden")
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
