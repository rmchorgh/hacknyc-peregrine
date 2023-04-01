import { auth } from "@/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    useEffect(() => {
      if (!auth.currentUser?.uid) {
        router.push("/");
      }
    }, [router, auth]);
  
    return <div>{auth?.currentUser?.uid ? children : null}</div>;
  }
  
  export default ProtectedRoutes;
  