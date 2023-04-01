import BrandButton from "@/components/BrandButton";
import FormField from "@/components/FormField";
import { Field } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import VariableField from "./VariableField";

function Content() {
  const apiChosen = "Linear";
  const [fields, setFields] = useState<Field[]>([
    {
      apiName: apiChosen,
      // @ts-ignore
      type: "",
      prompt: "",
    },
  ]);

  const handleAddField = () => {
    console.log("hello");
    fields.push({
      apiName: apiChosen,
      // @ts-ignore
      type: "",
      prompt: "",
    });
    setFields([...fields]);
  };

  useEffect(() => {
    if (fields.length === 0) {
      fields.push({
        apiName: apiChosen,
        // @ts-ignore
        type: "",
        prompt: "",
      });
      setFields([...fields]);
    }
  }, [fields]);

  return (
    <div className="w-full min-h-screen p-12 pr-[30rem]">
      <div className="text-black font-inter font-light mb-10 items-center flex flex-row gap-4">
        <div>Playground</div>
        <div className="text-sm bg-green-200 text-green-800 font-medium px-3 py-2 rounded-full">
          API: {apiChosen}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FormField
          label={"Email Subject"}
          errorMessage={""}
          onChange={() => console.log("hello")}
        />
        <FormField
          label={"Description"}
          type={"multiline"}
          errorMessage={""}
          onChange={() => console.log("hello")}
        />
        <div className="mt-5">
          <div className="text-sm text-gray-500 font-light mb-4">Fields</div>
          <div className="flex flex-col gap-4">
            {fields.map((field, i) => (
              <VariableField
                key={i}
                onSelected={(type) => {
                  // @ts-ignore
                  fields[i].type = type;
                }}
                onChange={(prompt) => {
                  fields[i].prompt = prompt;
                }}
                onDelete={() => {
                  setFields(fields.filter((f) => f.prompt !== field.prompt));
                }}
                value={fields[i].prompt}
              />
            ))}
          </div>
          <div
            className="text-sm text-gray-800 font-light mt-4 cursor-pointer"
            onClick={handleAddField}
          >
            + add field
          </div>
        </div>
      </div>
      <div className="w-[30%] ml-auto mt-10">
        <BrandButton text={"Done with this BS"} onClick={() => console.log("TODO")}/>
      </div>
    </div>
  );
}

export default Content;
