import { auth, db } from "@/firebase";
import Profile from "@/models/Profile";
import { ProfileType } from "@/types";
import { handleGoogleSignIn } from "@/utils/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { GiEgyptianBird } from "react-icons/gi";
function Sidebar() {
  const router = useRouter();

  const [playgrounds, setPlaygrounds] = useState([{}]);

  const handleLogPress = () => {
    if (auth.currentUser) {
      auth.signOut();
      router.push("/");
    } else {
      handleGoogleSignIn(router);
    }
  };

  useEffect(() => {
    const profileRef = doc(db, "users", auth.currentUser?.uid!);
    const unsubscribe = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        const currentProfile = Profile.fromSnapshot(docSnap);
      }
    });
    return () => unsubscribe();
  }, []);

  

  return (
    <>
      <div
        className="w-[20vw] translate-x-[-18vw] hover:translate-x-[1vw] top-[10vh] left-0 fixed drop-shadow-xl rounded-md transition-all
     bg-white h-[70vh] self-center justify-center border border-[#6666662a] duration-700"
      >
        <div className="w-full h-full relative">
          <div className="w-full h-full p-4 flex flex-col justify-between pb-10  ">
            <div className="font-[700] overflow-hidden">
              <div className="font-[700]">peregrine</div>
              <div className="flex mt-4 gap-4 items-center">
                {auth.currentUser?.photoURL && (
                  <img
                    src={auth.currentUser?.photoURL}
                    className={"w-[35px] h-[35px] rounded-full"}
                    alt={"profile user"}
                  />
                )}
                <div className="flex flex-col text-xs truncate whitespace-pre-wrap text-gray-500 opacity-60 font-[400]">
                  <div>{auth.currentUser?.displayName}</div>
                  <div>{auth.currentUser?.email}</div>
                </div>
              </div>
              <div className="font-[500] mt-10">Playgrounds</div>
              {playgrounds.map((playground) => (
                <div
                  className="flex gap-4 mt-2 items-center font-[300] p-2 pl-0
                               hover:bg-[#d1cbcb2c] rounded-md cursor-pointer"
                >
                  <GiEgyptianBird className="text-xl" />
                  <div>Playground 1</div>
                </div>
              ))}
              <div className="font-[100] text-md cursor-pointer hover:bg-[#d1cbcb2c] p-2 pl-0 rounded-md">
                + Add Playgrounds
              </div>
            </div>
            <div
              onClick={handleLogPress}
              className="underline text-[#666666] hover:text-black cursor-pointer transition-all overflow-hidden"
            >
              sign {auth.currentUser ? "out" : "in"}
            </div>
          </div>
          <div className="absolute  w-[2vw] h-full top-0 right-0  flex justify-center items-center ">
            <CgMenuGridO />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
