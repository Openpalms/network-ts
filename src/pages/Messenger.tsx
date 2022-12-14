import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { auth, bd } from '../api/config';
import { IUser } from '../Types/User';
import Chat from '../components/Chat';
import ChatCard from '../components/ChatCard';
import loader from '../assets/images/loader.svg';

function Messenger() {
  const [users, setUsers] = useState([] as IUser[]);
  const [currentUser, setCurrentUser] = useState(null as unknown as IUser[]);
  const [chatId, setId] = useState('' as string);
  const [loading, setLoading] = useState(false);
  const id = auth.currentUser?.uid;
  useEffect(() => {
    setLoading(true);
    const starCountRef = ref(bd);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const dataToArray: IUser[] = Object.assign([], Object.values(data));
        const otherUsers = dataToArray.filter((item) => item.uid !== id);
        const currUser = dataToArray.filter((item) => item.uid === id);
        setUsers(otherUsers);
        setCurrentUser(currUser);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="flex relative w-full h-[100%] bg-[#04724D]  rounded-xl  md:overflow-y-scroll ">
      {loading && (
        <img
          src={loader}
          alt="loading"
          className="h-[50%] w-[50%] self-center"
        />
      )}
      <div
        className={`border-r w-[100%] h-[100%] md:h-[30rem] md:overflow-x-scroll flex flex-col 2xl:h-[50rem] 

      ${chatId && 'hidden md:flex'}
      `}
      >
        {users.map((follower: IUser) => (
          <div
            className=""
            onClick={() => setId(follower.uid!)}
            key={follower.uid}
          >
            <ChatCard {...currentUser} {...follower} chatId={chatId} />
          </div>
        ))}
      </div>
      <div
        className={`${chatId && 'flex w-full h-[80vh] md:hidden'} md:hidden `}
      >
        {chatId && <Chat id={chatId} setId={setId} />}
      </div>
      <div className=" hidden w-[70%] h-[80vh] md:flex ">
        {/* Chat will be displayed here by clicking on user icons  */}
        {chatId && <Chat id={chatId} />}
        {!chatId && (
          <p className="w-full ml-20 self-center   text-white">
            Start chatting!
          </p>
        )}
      </div>
    </div>
  );
}

export default Messenger;
