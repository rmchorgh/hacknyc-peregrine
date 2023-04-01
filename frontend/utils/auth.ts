import { auth, db, provider } from "@/firebase";
import { signInWithPopup } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { NextRouter } from "next/router";

export const handleGoogleSignIn = async (router: NextRouter) => {
  signInWithPopup(auth, provider).then(async (res) => {
    const profileId = res.user?.uid;
    const docRef = doc(db, "users", profileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // handle existing user
      // ...
    } else {
      // handle new user
      // ...
    }
    router.push("/");
  });
};
