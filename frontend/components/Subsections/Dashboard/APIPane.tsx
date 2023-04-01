import BrandButton from "@/components/BrandButton";
import FormField from "@/components/FormField";
import { auth, db } from "@/firebase";
import { API } from "@/types";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AddAPIModal from "./AddAPIModal";

function APIPane() {
  const [apis, setAPIs] = useState<API[]>([]);
  const [visible, setVisible] = useState(false);
  const [activeAPI, setActiveAPI] = useState<API>();

  useEffect(() => {
    const profileRef = doc(db, "users", auth.currentUser?.uid!);
    const apisRef = collection(profileRef, "apis");
    const unsubscribe = onSnapshot(apisRef, (snapshot) => {
      const userAPIs: API[] = snapshot.docs.map(
        (docSnap) => docSnap.data() as API
      );
      if (userAPIs.length == 0) {
        setAPIs([
          { name: "Linear", key: "" },
          { name: "Slack", key: "" },
        ]);
      } else {
        setAPIs(userAPIs);
      }
    });
    return () => unsubscribe();
  }, []);

  // const addAPI = () => {
  //   const api: API = {
  //     name: "",
  //     key: "",
  //   };
  //   setAPIs([...apis, api]);
  //   const apiRef = collection(db, "users", auth.currentUser?.uid!, "apis");
  //   setDoc(doc(apiRef), api).then(() => alert("API added"));
  // }

  const handleAPIPress = (apipressed: string) => {
    const currentAPI = apis.filter((api) => api.name == apipressed)[0];
    setActiveAPI(currentAPI);
    setVisible(true);
  };

  return (
    <>
      <div className="w-full h-screen border p-12">
        <div className="text-black font-inter font-light mb-10">
          Integrateable APIs
        </div>
        <div className="flex flex-col gap-4">
          <BrandButton
            text={"Linear"}
            type={"normal"}
            onClick={() => handleAPIPress("Linear")}
          />
          <BrandButton
            text={"Slack"}
            type={"normal"}
            onClick={() => handleAPIPress("Slack")}
          />
        </div>
      </div>
      {activeAPI && (
        <AddAPIModal
          visible={visible}
          toClose={() => setVisible(false)}
          api={activeAPI}
        />
      )}
    </>
  );
}

export default APIPane;
