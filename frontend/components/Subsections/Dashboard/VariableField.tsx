import FieldDropDown from "@/components/FieldDropDown";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

type VariableFieldProps = {
  onSelected: (value: string) => void;
  onChange: (value: string) => void;
  onDelete: () => void;
  value: string;
};

function VariableField({ onSelected, onChange, onDelete, value}: VariableFieldProps) {
  const types = ["Text", "Line Graph", "Bar Graph"];
  const [currentValue, setCurrentValue] = useState(value);
  const handleSelectedType = (value: string) => {
    if (value === "Text") {
      onSelected("text");
    } else if (value === "Line Graph") {
      onSelected("linegraph");
    } else if (value === "Bar Graph") {
      onSelected("bargraph");
    }
  };

  const handleOnEdit = (value: string) => {
    setCurrentValue(value);
    onChange(value);
  }

  useEffect(() => {
    setCurrentValue(value);
  }, [value])

  return (
    <div className="border rounded-2xl p-4 flex gap-4 items-center">
      <FieldDropDown values={types} onSelected={handleSelectedType} />
      <input
        className="border-none outline-none rounded-md px-4 py-2 
        transition-all bg-transparent w-full"
        placeholder="Enter a prompt for a variable name..."
        onChange={(e) => handleOnEdit(e.target.value)}
       value={currentValue}
      />
      <div>
        <BiTrash className="text-blue-800 cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
}

export default VariableField;
