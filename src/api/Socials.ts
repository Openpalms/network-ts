import { bd, storage, auth } from './config';
import { ref, remove, set, update } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { IUser } from '../Types/User';

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
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
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

  addUserInfo(body: IUser) {
    set(ref(bd, `${body.uid}/`), { ...body });
  },
};
