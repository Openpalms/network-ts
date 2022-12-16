import React from 'react';
import UserCard from '../components/UserCard';
import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { auth, bd } from '../api/config';
import { IUser } from '../Types/User';
import Chat from '../components/Chat';
import { Link, Routes, Route } from 'react-router-dom';
function Messenger() {
  const [users, setUsers] = useState([] as any);
  const [chatId, setId] = useState('' as any);
  const id = auth.currentUser?.uid;
  useEffect(() => {
    const starCountRef = ref(bd);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const dataToArray = Object.assign([], Object.values(data));
        setUsers(dataToArray);
      }
    });
  }, []);
  return (
    <div className="flex relative w-full h-[100%] bg-[#50597b]  rounded-xl  overflow-y-scroll ">
      <div className="border-r w-[20rem] h-[30rem] overflow-x-scroll flex flex-col">
        <Link
          to={`/messages/hello`}
          className="hover:text-[#13a7ab] hover:border-b-4 border-[#13a7ab]	  transition-all h-[100%] w-[10%]"
        >
          home
        </Link>
        {users.map((follower: IUser) => (
          <div
            className=""
            onClick={() => setId(follower.uid)}
            key={follower.uid}
          >
            <UserCard {...follower} />
          </div>
        ))}
      </div>
      <button onClick={() => console.log(chatId)}>test</button>
      <div className="  w-[100%] h-[100%] overflow-x-scroll flex flex-col items-center justify-center">
        {/* <p className="text-white uppercase">select a chat</p> */}
        {/* Chat will be displayed here by clicking on user icons  */}
        {chatId && <Chat id={chatId} />}
      </div>
    </div>
  );
}

export default Messenger;
