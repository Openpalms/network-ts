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
        className={`border-4 w-[70%] h-[55vh]
      my-20 mx-auto rounded-xl bg-[#04724D] 
      ${loginError && '  border-red-500'}`}
      >
        {loginError ? (
          <p className="lowercase text-center text-white text-sm">
            {loginError}
          </p>
        ) : (
          <p className="text-white uppercase text-center mb-2">login</p>
        )}

        <div
          className="flex flex-col justify-start
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
            className="w-[30%] self-center border mt-5"
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
