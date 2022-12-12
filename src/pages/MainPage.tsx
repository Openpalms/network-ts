import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { bd, auth } from '../api/config';
import { IUser } from '../Types/User';
import { useParams } from 'react-router-dom';
const MainPage = () => {
  let { id } = useParams();
  let uid = id || auth.currentUser?.uid;
  const [user, setUser] = useState({
    fullname: 'Setup your profile',
    age: 'go to settings!',
  } as IUser);

  useEffect(() => {
    const starCountRef = ref(bd, uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setUser(data);
      }
    });
  }, [uid]);

  return (
    <>
      <div className="  bg-[#50597b]  rounded-xl flex justify-center">
        <div className="flex flex-col justify-start w-48 m-10 ml-16 text-white">
          <p className="font-bold text-2xl ">
            {user && user.fullname}, {user && user.age}
          </p>

          <img
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
            className="w-[170px] h-40 rounded-md"
            alt="avatar"
          />
          <p className="pt-5 text-sm">{user && user.status}</p>
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
      </div>
    </>
  );
};

export default MainPage;
