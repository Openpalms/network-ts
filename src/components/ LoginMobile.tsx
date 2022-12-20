import React from 'react';
import { LogUserIn } from '../HandleChanges/UserAuth';
function LoginMobile() {
  const {
    SubmitLoginForm,
    setLoginEmail,
    setLoginPassword,
    loginEmail,
    loginPassword,
    loginError,
  } = LogUserIn();
  return (
    <>
      <form
        className="border w-[70%] h-[50vh]
      my-20 mx-auto rounded-xl bg-[#04724D] "
      >
        <p className="text-white uppercase text-center mt-2">login</p>
        <div
          className="flex flex-col justify-around
        h-[90%] text-white uppercase"
        >
          <label htmlFor="" className="mt-5 mx-2">
            email
          </label>
          <input
            placeholder="email"
            className=" rounded-md mx-2 text-black"
            type="email"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <label htmlFor="" className="mt-5 mx-2">
            password
          </label>
          <input
            className=" rounded-md mx-2 text-black"
            type="password"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="****"
          />

          <button
            className="w-[30%] self-center border"
            onClick={(e) => SubmitLoginForm(e, loginEmail, loginPassword)}
          >
            login
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginMobile;
