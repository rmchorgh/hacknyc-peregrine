import BrandButton from "@/components/BrandButton";
import Layout from "@/components/Layouts/Layout";
import { auth, db, provider } from "@/firebase";
import { handleGoogleSignIn } from "@/utils/auth";
import { signInWithPopup } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import scribbles from "../../../public/Scribbles.svg";

function WelcomePage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen overflow-hidden fixed top-0 left-0">
      <Layout>
        <div className="flex relative flex-col gap-4 items-center pt-44 w-full h-full">
          <div className="text-7xl font-medium text-center">
            <span className="text-gradient">AI Zapier</span> <br />
            for newsletters
          </div>
          <div className="font-inter font-medium">
            a chat gpt wrapper for hot insights
          </div>
          <BrandButton
            className={"mt-10"}
            text={"Try now with Google"}
            onClick={() => handleGoogleSignIn(router)}
          />
        </div>
      </Layout>
      <div>
        <img
          src={scribbles.src}
          alt={"asset"}
          className="absolute bottom-[-42vh] opacity-90 
          pointer-events-none w-screen h-full"
        />
      </div>
    </div>
  );
}

export default WelcomePage;
