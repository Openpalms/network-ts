import { bd, storage, auth } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const HandleUserActions = {
  CreateNewUser(auth: any, email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        return errorMessage;
      });
  },

  loginUser(auth: any, email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        return await user;
      })
      .catch(async (er) => {
        const errorCode = er.code;
        const errorMessage = er.message;
        return await er;
      });
  },
  logoutUser() {
    auth.signOut();
  },
};
