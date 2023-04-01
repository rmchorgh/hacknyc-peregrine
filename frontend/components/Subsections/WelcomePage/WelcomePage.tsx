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
    <>
      <Layout>
        <div className="flex relative flex-col gap-4 items-center pt-44 min-h-screen">
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
    </>
  );
}

export default WelcomePage;
