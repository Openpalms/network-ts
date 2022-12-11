import { useEffect, useState } from 'react';
import { auth } from '../api/config';
import { onAuthStateChanged } from 'firebase/auth';
import { HandleUserActions } from '../api/Socials';

export const AuthUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeated, setPasswordRepeated] = useState('');

  const SubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    e.preventDefault();

    HandleUserActions.CreateNewUser(auth, email, password);
    clearInput();
  };

  const clearInput = () => {
    setPassword('');
    setEmail('');
    setPasswordRepeated('');
  };

  return {
    SubmitForm,
    setEmail,
    setPassword,
    setPasswordRepeated,
    email,
    password,
    passwordRepeated,
  };
};

export const LogUserIn = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const SubmitLoginForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    HandleUserActions.loginUser(auth, email, password);
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
