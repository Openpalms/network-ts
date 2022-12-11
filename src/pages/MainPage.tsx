import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { bd, auth } from '../api/config';
import Posts from '../components/Posts';
import { IUser } from '../Types/User';

const MainPage = () => {
  const [user, setUser] = useState({
    fullname: 'Setup your profile',
    age: 'go to settings!',
  } as IUser);
  useEffect(() => {
    const starCountRef = ref(bd, auth.currentUser?.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(auth.currentUser?.uid);
      if (data !== null) {
        setUser(data);
      }
    });
  }, []);

  return (
    <>
      <div className="flex justify-center ">
        <div className="w-[70vw]  bg-[#50597b]  rounded-xl flex justify-around">
          <div className="flex flex-col justify-start w-48 m-10 ml-16 text-white">
            <img
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              className="w-[170px] h-40 rounded-md"
              alt="avatar"
            />
            <div className="mt-10 flex">
              <button className="uppercase mr-1 p-2 bg-[#13a7ab] rounded ">
                {' '}
                message
              </button>
              <button className="uppercase mr-1 p-2 bg-[#13a7ab] rounded ">
                friends{' '}
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start w-[50%] p-10 text-white ">
            <p className="font-bold text-2xl ">
              {user && user.fullname}, {user && user.age}
            </p>
            <p className="pt-5 text-sm">{user && user.status}</p>
            <p className="pt-5 text-lg">posts:</p>
            <Posts />
            <button className="border bg-[#13a7ab]">add post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
