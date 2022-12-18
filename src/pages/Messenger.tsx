import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { auth, bd } from '../api/config';
import { IUser } from '../Types/User';
import Chat from '../components/Chat';
import { Link } from 'react-router-dom';
import ChatCard from '../components/ChatCard';

function Messenger() {
  const [users, setUsers] = useState([] as any);
  const [currentUser, setCurrentUser] = useState(null as unknown as IUser[]);
  const [chatId, setId] = useState('' as any);
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
    <div className="flex relative w-full h-[100%] bg-[#50597b]  rounded-xl  overflow-y-scroll ">
      <div className="border-r w-[20rem] h-[30rem] overflow-x-scroll flex flex-col">
        {users.map((follower: IUser) => (
          <div
            className=""
            onClick={() => setId(follower.uid)}
            key={follower.uid}
          >
            <ChatCard {...currentUser} {...follower} />
          </div>
        ))}
      </div>
      <div className="  w-[100%] h-[100%] overflow-x-scroll flex flex-col items-center justify-center">
        {/* Chat will be displayed here by clicking on user icons  */}
        {chatId && <Chat id={chatId} />}
      </div>
    </div>
  );
}

export default Messenger;
