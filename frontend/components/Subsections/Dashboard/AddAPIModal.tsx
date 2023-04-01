import BrandButton from "@/components/BrandButton";
import FormField from "@/components/FormField";
import { auth, db } from "@/firebase";
import { API } from "@/types";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type AddAPIModalProps = {
  visible: boolean;
  toClose: () => void;
  api: API;
};
function AddAPIModal({ visible, toClose, api }: AddAPIModalProps) {
  const [apiKey, setAPIKey] = useState(api.key);

//   useEffect(() => {
//     setAPIKey(apiKey)
//   }, [visible])

  const handleSave = async () => {
    if (apiKey == "") {
      alert("Please put in your api key");
      return;
    }
    const profileRef = doc(db, "users", auth?.currentUser?.uid!);
    const collectionRef = collection(profileRef, "apis");
    const docRef = doc(db, "users", auth.currentUser?.uid!, "apis", api.name);
    await setDoc(docRef, {
      name: api.name,
      key: apiKey,
    }).then(() => {
      alert("Saved API Key");
      toClose();
    });
  };
  return (
    <div
      className={
        "w-screen h-screen fixed top-0 bg-white flex flex-col " +
        "items-center align-center z-[99999999] gap-10 justify-center" +
        " " +
        (!visible && "hidden")
      }
    >
      <FormField
        label={`Add API key for ${api.name}`}
        // @ts-ignore
        onChange={(e) => setAPIKey(e.target.value)}
        value={apiKey}
      />
      <BrandButton text={"Save"} onClick={handleSave} />
      <div className="h-[10vh]" />
      <div className="cursor-pointer" onClick={toClose}>close</div>
    </div>
  );
}

export default AddAPIModal;
