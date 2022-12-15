import { useState } from 'react';
import { AuthUser, LogUserIn } from '../HandleChanges/UserAuth';
const LoginForm = () => {
  const [isActive, setIsActive] = useState(true);

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
  const {
    SubmitLoginForm,
    setLoginEmail,
    setLoginPassword,
    loginEmail,
    loginPassword,
    loginError,
  } = LogUserIn();

  return (
    <section className="forms-section">
      <div className="forms">
        <div className={`form-wrapper ${isActive && 'is-active'}`}>
          <button
            type="button"
            className="switcher switcher-login border"
            onClick={() => setIsActive(true)}
          >
            Login
            <span className="underline"></span>
          </button>
          <form className={`${loginError ? 'formError' : 'form'} form-login`}>
            <fieldset>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="btn-login"
              onClick={(e) => SubmitLoginForm(e, loginEmail, loginPassword)}
            >
              Login
              {}
            </button>
          </form>
        </div>
        <div className={`form-wrapper ${!isActive && 'is-active'}`}>
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => setIsActive(false)}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <form className={`${error ? 'formError' : 'form'} form-signup`}>
            <fieldset>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input
                  placeholder="me@gmail.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">Full name</label>
                <input
                  type="text"
                  required
                  placeholder="John Smith"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">age</label>
                <input
                  type="text"
                  required
                  placeholder="21"
                  value={authAge}
                  onChange={(e) => setAuthAge(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="btn-signup"
              onClick={(e) => SubmitForm(e, email, password)}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
