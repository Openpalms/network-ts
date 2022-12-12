import { useState } from 'react';
import { AuthUser, LogUserIn } from '../HandleChanges/UserAuth';
const LoginForm = () => {
  const [isActive, setIsActive] = useState(true);

  const {
    SubmitForm,
    setEmail,
    setPassword,
    setPasswordRepeated,
    email,
    password,
    passwordRepeated,
  } = AuthUser();
  const {
    SubmitLoginForm,
    setLoginEmail,
    setLoginPassword,
    loginEmail,
    loginPassword,
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
          <form className="form form-login">
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
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
          <form className="form form-signup">
            <fieldset>
              <legend>
                Please, enter your email, password and password confirmation for
                sign up.
              </legend>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="input-block">
                <label htmlFor="signup-password-confirm">
                  Confirm password
                </label>
                <input
                  id="signup-password-confirm"
                  type="password"
                  required
                  value={passwordRepeated}
                  onChange={(e) => setPasswordRepeated(e.target.value)}
                />
              </div>
            </fieldset>
            <button
              type="submit"
              disabled={password !== passwordRepeated}
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
