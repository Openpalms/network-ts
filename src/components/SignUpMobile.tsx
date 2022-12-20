import React from 'react';
import { AuthUser } from '../HandleChanges/UserAuth';
function SignUpMobile() {
  const {
    SubmitForm,
    setEmail,
    setPassword,
    setAuthAge,
    setAuthName,
    email,
    password,
    authAge,
    authName,
    error,
  } = AuthUser();
  return (
    <>
      <form
        className="border w-[70%] h-[70vh]
      my-20 mx-auto rounded-xl bg-[#04724D] "
      >
        <p className="text-white uppercase text-center mt-2">Sign Up</p>
        <div
          className="flex flex-col justify-around
        h-[90%] text-white uppercase"
        >
          <label htmlFor="" className="mt-5 mx-2">
            E-mail
          </label>
          <input
            placeholder="email"
            className=" rounded-md mx-2 text-black"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="" className="mt-5 mx-2">
            Fullname
          </label>
          <input
            className=" rounded-md mx-2 text-black"
            type="text"
            required
            value={authName}
            onChange={(e) => setAuthName(e.target.value)}
            placeholder="John Smith"
          />
          <label htmlFor="" className="mt-5 mx-2">
            Age
          </label>
          <input
            placeholder="email"
            className=" rounded-md mx-2 text-black"
            type="text"
            required
            value={authAge}
            onChange={(e) => setAuthAge(e.target.value)}
          />
          <label htmlFor="" className="mt-5 mx-2">
            password
          </label>
          <input
            className=" rounded-md mx-2 text-black"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="****"
          />

          <button
            className="w-[30%] self-center border"
            onClick={(e) => SubmitForm(e, email, password)}
          >
            login
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpMobile;
