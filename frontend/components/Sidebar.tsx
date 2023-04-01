import { auth } from "@/firebase";
import { handleGoogleSignIn } from "@/utils/auth";
import { useRouter } from "next/router";
import React from "react";
import { CgMenuGridO } from "react-icons/cg";
function Sidebar() {
  const router = useRouter();

  const handleLogPress = () => {
    if (auth.currentUser) {
      auth.signOut();
      router.push("/");
    } else {
      handleGoogleSignIn(router);
    }
  };
  return (
    <>
      <div
        className="w-[20vw] translate-x-[-18vw] hover:translate-x-[1vw] top-[10vh] left-0 absolute drop-shadow-xl rounded-md transition-all
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
