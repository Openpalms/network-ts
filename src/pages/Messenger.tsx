import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { auth, bd } from '../api/config';
import { IUser } from '../Types/User';
import Chat from '../components/Chat';
import ChatCard from '../components/ChatCard';

function Messenger() {
  const [users, setUsers] = useState([] as IUser[]);
  const [currentUser, setCurrentUser] = useState(null as unknown as IUser[]);
  const [chatId, setId] = useState('' as string);
  const id = auth.currentUser?.uid;
  useEffect(() => {
    const starCountRef = ref(bd);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const dataToArray: IUser[] = Object.assign([], Object.values(data));
        const otherUsers = dataToArray.filter((item) => item.uid !== id);
        const currUser = dataToArray.filter((item) => item.uid === id);
        setUsers(otherUsers);
        setCurrentUser(currUser);
      }
    });
  }, []);

  return (
    <div className="flex relative w-full h-[100%] bg-[#04724D]  rounded-xl  overflow-y-scroll ">
      <div className="border-r w-[100%] h-[30rem] overflow-x-scroll flex flex-col 2xl:h-[50rem]">
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
      <div className=" w-[70%] h-[80vh] flex">
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
