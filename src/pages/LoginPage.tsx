import LoginForm from '../components/LoginForm';
import LoginMobile from '../components/ LoginMobile';
import SignUpMobile from '../components/SignUpMobile';
import { useState } from 'react';

const MainPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  return (
    <>
      <div className="flex justify-around sm:hidden">
        <div
          className="uppercase hover:border-b hover:border-[#04724D] transition-all "
          onClick={() => setIsLoginPage(true)}
        >
          Login
        </div>
        <div
          className="uppercase hover:border-b hover:border-[#04724D] transition-all"
          onClick={() => setIsLoginPage(false)}
        >
          Sign Up
        </div>
      </div>
      <div className="max-[600px]:hidden">
        <LoginForm />
      </div>
      <div className="sm:hidden">
        {isLoginPage ? <LoginMobile /> : <SignUpMobile />}
      </div>
    </>
  );
};

export default MainPage;
