import { useEffect, useState } from 'react';
import { auth, storage } from '../api/config';
import { onAuthStateChanged } from 'firebase/auth';
import { HandleUserActions } from '../api/Socials';
import { IPost } from '../Types/Post';
import { nanoid } from 'nanoid';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import dayjs from 'dayjs';

export const AuthUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authName, setAuthName] = useState('');
  const [authAge, setAuthAge] = useState('');
  const SubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        HandleUserActions.addUserInfo({
          uid: auth.currentUser?.uid,
          fullname: authName,
          age: authAge,
          status: '',
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setTimeout(() => {
          setError('');
        }, 5000);
      });
    clearInput();
  };

  const clearInput = () => {
    setPassword('');
    setEmail('');
    setAuthAge('');
    setAuthName('');
  };

  return {
    SubmitForm,
    setEmail,
    setPassword,
    setAuthName,
    setAuthAge,
    email,
    password,
    error,
    authAge,
    authName,
  };
};

export const LogUserIn = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const SubmitLoginForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((er) => {
        const errorMessage = er.message;
        setLoginError(errorMessage);
      })
      .finally(() => {
        setTimeout(() => {
          setLoginError('');
        }, 5000);
      });
    // HandleUserActions.loginUser(auth, email, password);
    clearInput();
  };

  const clearInput = () => {
    setLoginPassword('');
    setLoginEmail('');
  };

  return {
    SubmitLoginForm,
    setLoginEmail,
    setLoginPassword,
    loginEmail,
    loginPassword,
    loginError,
  };
};

export const IsUserLogged = () => {
  const [currentUser, setCurrentUser] = useState(null as any);
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return {
    currentUser,
  };
};
export const UpdateStatus = () => {
  const [status, setStatus] = useState('');

  const submitStatus = (status: string) => {
    if (auth.currentUser?.uid && status !== '') {
      HandleUserActions.updateUserStatus(auth.currentUser?.uid, status);
    }
    setStatus('');
  };

  return {
    submitStatus,
    setStatus,
    status,
  };
};
export const SetUserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  const SubmitLoginForm = (fullname: string, age: string, status: string) => {
    const userInfo = {
      uid: auth.currentUser?.uid,
      fullname,
      age,
      status,
    };
    if (fullName.length >= 5 && age.length >= 1 && status !== '') {
      HandleUserActions.addUserInfo(userInfo);
    }
    clearInput();
  };

  const clearInput = () => {
    setFullName('');
    setAge('');
    setStatus('');
  };

  return {
    SubmitLoginForm,
    setFullName,
    setAge,
    setStatus,
    fullName,
    age,
    status,
  };
};

export const AddNewPost = () => {
  const [postBody, setPostBody] = useState('');

  const CreateNewPost = (postBody: string) => {
    const newPost: IPost = {
      authorId: auth.currentUser?.uid,
      postId: nanoid(),
      postBody,
      likesCount: [{ uid: '13231' }],
      createAt: `${dayjs().format('YYYY/MM/DD/HH/mm/ss')}`,
    };
    if (postBody.length >= 1) {
      HandleUserActions.addPost(newPost);
    }
    setPostBody('');
  };

  return {
    CreateNewPost,
    setPostBody,
    postBody,
  };
};

export const uploadFiles = (file: any) => {
  if (!file) return;
  const storageRef = ref(storage, auth.currentUser?.uid);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {},
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        HandleUserActions.addUserPhoto(auth.currentUser?.uid, url);
      });
    }
  );
};
