import BrandButton from "@/components/BrandButton";
import FormField from "@/components/FormField";
import { auth, db } from "@/firebase";
import { API, Field, Template } from "@/types";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import VariableField from "./VariableField";

type ContentProps = {
  activePlaygroundId: string;
};

function Content({ activePlaygroundId }: ContentProps) {
  const [activePlayground, setActivePlayground] = useState<Template>();
  const [playgrounds, setPlaygrounds] = useState<Template[]>([]);
  const [hasAPIKeys, setHasAPIKeys] = useState(false);
  const [fields, setFields] = useState<Field[]>([
    {
      apiName: "",
      // @ts-ignore
      type: "",
      prompt: "",
    },
  ]);

  const handleAddField = () => {
    fields.push({
      apiName: "",
      // @ts-ignore
      type: "",
      prompt: "",
    });
    setFields([...fields]);
  };

  useEffect(() => {
    if (fields.length === 0) {
      fields.push({
        apiName: "",
        // @ts-ignore
        type: "",
        prompt: "",
      });
      setFields([...fields]);
    }
  }, [fields]);

  useEffect(() => {
    if (activePlaygroundId.length > 5) {
      const playgroundRef = doc(
        db,
        "users",
        auth.currentUser?.uid!,
        "playgrounds",
        activePlaygroundId
      );
      const unsubscribe = onSnapshot(playgroundRef, (docSnap) => {
        // @ts-ignore
        setActivePlayground(docSnap.data());
        setFields(docSnap.data()?.fields || []);
      });
      return () => unsubscribe();
    }
  }, [activePlaygroundId]);



  const handleEmailSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    activePlayground.emailSubject = e.target.value;
    setActivePlayground({ ...activePlayground! });
  };
  const handleEmailRecipientsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // @ts-ignore
    activePlayground.emailRecipients = e.target.value.split(",");
    setActivePlayground({ ...activePlayground! });
  };
  const handleEmailDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // @ts-ignore
    activePlayground.emailDescription = e.target.value;
    setActivePlayground({ ...activePlayground! });
  };

  const isInvalidPost = () => {
    return (
      activePlayground?.emailSubject?.length == 0 ||
      activePlayground?.emailRecipients?.length == 0 ||
      activePlayground?.emailDescription?.length == 0 ||
      fields == undefined ||
      activePlayground?.emailSubject == undefined ||
      activePlayground?.emailRecipients == undefined ||
      activePlayground?.emailDescription == undefined
    );
  };

  const handleSave = async () => {
    if (isInvalidPost()) {
      alert("Please fill out all fields");
      return;
    }
    const playgroundRef = doc(
      db,
      "users",
      auth.currentUser?.uid!,
      "playgrounds",
      activePlaygroundId
    );
    const cleanedFields  = fields.map((field) => {
      const newField = field
      // @ts-ignore
      if (field.type == "") {
        newField.type = "text"
      }
      if (field.apiName == "") {
        newField.apiName = "Linear";
      }
      return newField
    })
    
    await updateDoc(playgroundRef, {
      emailSubject: activePlayground?.emailSubject,
      emailRecipients: activePlayground?.emailRecipients,
      emailDescription: activePlayground?.emailDescription,
      fields: cleanedFields || [],
    }).then(() => {
      alert("Saved!");
    });
  };

  useEffect(() => {
    const profileRef = doc(db, "users", auth.currentUser?.uid!);
    const apisRef = collection(profileRef, "apis");
    const unsubscribe = onSnapshot(apisRef, (snapshot) => {
      const userAPIs: API[] = snapshot.docs.map(
        (docSnap) => docSnap.data() as API
      );
      setHasAPIKeys(userAPIs.length > 1);
    });
    return () => unsubscribe();
  }, []);




  if (activePlaygroundId == "" || activePlayground == undefined) {
    return (
      <div className="w-full min-h-screen p-28 text-md ">
        Please select/add a newsletter for the service on the left hand
        dashboard.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-12 pr-[30rem]">
      <div className="text-black font-inter font-light mb-10 ">
        <div>Playground</div>
      </div>
      <div className="flex flex-col gap-4">
        <FormField
          label={"Email Subject"}
          errorMessage={""}
          value={activePlayground?.emailSubject || ""}
          onChange={handleEmailSubjectChange}
        />
        <FormField
          label={"Email Recipients (Seperate by comma)"}
          errorMessage={""}
          value={activePlayground?.emailRecipients?.join(", ") || ""}
          onChange={handleEmailRecipientsChange}
        />
        <FormField
          label={"Description"}
          type={"multiline"}
          errorMessage={""}
          value={activePlayground?.emailDescription || ""}
          // @ts-ignore
          onChange={handleEmailDescriptionChange}
        />
        <div className="mt-5">
          <div className="text-sm text-gray-500 font-light mb-4">Fields</div>
          <div className="flex flex-col gap-4">
            {fields.map((field, i) => (
              <VariableField
                key={i}
                onTypeSelected={(type) => {
                  // @ts-ignore
                  fields[i].type = type;
                  setFields(fields)
                }}
                onAPISelected={(api) => {
                  fields[i].apiName = api;
                  setFields(fields)
                }}
                onChange={(prompt) => {
                  fields[i].prompt = prompt;
                  setFields(fields)
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
      <div className={"w-[40%] ml-auto mt-10" + (hasAPIKeys ? "" : " pointer-events-none opacity-70")}>
        <BrandButton text={"Done with this BS"} onClick={handleSave} />
        {!hasAPIKeys && (
          <div className="text-center font-light mt-2">You need to add API keys!</div>
        )}
      </div>
    </div>
  );
}

export default Content;
