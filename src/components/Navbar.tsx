import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HandleUserActions } from '../api/Socials';
import { auth } from '../api/config';
import NavbarTyping from './NavbarTyping';
import menu from '../assets/images/burgerMenu.svg';
import exit from '../assets/images/exit.svg';
const Navbar = () => {
  const [drop, setdrop] = useState(false);
  const closeDrop = () => {
    setdrop(false);
  };
  return (
    <>
      <div className="flex items-center justify-between h-[50px] bg-[#04724D] shadow  text-white 2xl:h-[75px] ">
        <div className="pl-5 uppercase text-[#fff] hidden md:flex w-[50vw]">
          <NavbarTyping />
        </div>
        <div className="w-[50%] h-[100%] flex justify-around items-end pt-3 text-center font-bold transition-all max-[600px]:justify-center max-[600px]:w-full">
          <Link
            to={`/${auth.currentUser?.uid}`}
            className="hover:text-[#13a7ab] hover:border-b-4 border-[#13a7ab]	  transition-all h-[100%] w-[10%] max-[600px]:w-full"
          >
            home
          </Link>
          {!auth.currentUser?.uid && (
            <Link
              to={'/login'}
              className="hover:text-[#13a7ab] hover:border-b-4 border-[#13a7ab]	  transition-all h-[100%] w-[10%] max-[600px]:w-full"
            >
              Login
            </Link>
          )}
          <Link
            to={'/login'}
            className="hover:text-[#13a7ab] hover:border-b-4 border-[#13a7ab]	  transition-all h-[100%] w-[10%] max-[600px]:w-full"
            onClick={HandleUserActions.logoutUser}
          >
            Logout
          </Link>
        </div>
        <div className="">
          {!drop ? (
            <img
              src={menu}
              alt="burger_menu"
              className="w-full h-5 pr-5 md:hidden transition-all"
              onClick={() => setdrop(!drop)}
            />
          ) : (
            <img
              src={exit}
              alt="burger_menu_exit"
              className="w-full h-5 pr-5 md:hidden transition-all"
              onClick={() => setdrop(!drop)}
            />
          )}
        </div>
      </div>

      <ul
        className={`absolute z-20 md:hidden  text-white transition-all bg-[#04724D] w-full px-8 
      ${!drop && 'hidden'}
      `}
      >
        <li className="border-b-2 border-zinc-300 w-full mt-2   ">
          <Link to={'/settings'} onClick={closeDrop}>
            settings
          </Link>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mt-2">
          <Link to={'/users'} onClick={closeDrop}>
            users
          </Link>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mb-5 mt-2 ">
          <Link to={'/messages'} onClick={closeDrop}>
            messages
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
