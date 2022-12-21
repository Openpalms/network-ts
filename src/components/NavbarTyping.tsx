import ReactTypingEffect from 'react-typing-effect';

const NavbarTyping = () => {
  return (
    <>
      <ReactTypingEffect
        text={['Be in touch!', 'start getting followers', 'chat with friends']}
        speed={100}
        eraseSpeed={100}
        cursor="|"
        cursorClassName="text-white"
      />
    </>
  );
};
export default NavbarTyping;
