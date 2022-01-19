import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { auth } from "../services/firebase";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const googleHandler = async () => {
  return new Promise<UserCredential>((resolve, reject) => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
