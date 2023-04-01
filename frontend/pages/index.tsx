import { Inter } from "next/font/google";
import WelcomePage from "@/components/Subsections/WelcomePage/WelcomePage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "@/firebase";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import Dashboard from "./dashboard";
import MetaData from "@/components/MetaData";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  // use on auth changed
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <MetaData />

      <div className="bg-white text-black font-inter min-h-screen">
        {/* when a user is signed in */}
        {auth?.currentUser?.uid ? (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ) : (
          <WelcomePage />
          
        )}
      </div>
    </>
  );
}
