import { Link } from 'react-router-dom';
import { HandleUserActions } from '../api/Socials';
import { auth } from '../api/config';
import NavbarTyping from './NavbarTyping';
const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between h-[50px] bg-[#04724D] shadow  text-white 2xl:h-[75px] ">
        <div className="pl-5 uppercase text-[#fff]">
          <NavbarTyping />
        </div>
        <div className="w-[50%] h-[100%] flex justify-around items-end pt-3 text-center font-bold transition-all ">
          <Link
            to={`/${auth.currentUser?.uid}`}
            className="hover:text-[#13a7ab] hover:border-b-4 border-[#13a7ab]	  transition-all h-[100%] w-[10%]"
          >
            home
          </Link>
          {!auth.currentUser?.uid && (
            <Link
              to={'/login'}
              className="hover:text-[#13a7ab] hover:border-b-4 border-[#13a7ab]	  transition-all h-[100%] w-[10%]"
            >
              Login
            </Link>
          )}
          <Link
            to={'/login'}
            className="hover:text-[#13a7ab] hover:border-b-4 border-[#13a7ab]	  transition-all h-[100%] w-[10%]"
            onClick={HandleUserActions.logoutUser}
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
