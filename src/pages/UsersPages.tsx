import search from '../assets/images/search.gif';
import UserCard from '../components/UserCard';
import scroll from '../assets/images/scroll.png';
import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { bd } from '../api/config';
import { IUser } from '../Types/User';
const UserPages = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([] as any);
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
    <div className="flex  w-[100%] h-[100%] bg-[#50597b]  rounded-xl flex-col overflow-y-scroll ">
      <div className="m-5 ">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img className="h-5 w-5 fill-slate-300" src={search} alt="" />
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anyone..."
            type="text"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="my-5 mx-auto w-10 h-10 ">
        <img src={scroll} />
      </p>
      <div className="flex flex-col overflow-x-scroll h-[20rem] p-5 border mx-5 bg-[#1f253d] rounded">
        {users &&
          users
            .filter((user: IUser) =>
              user.fullname.toLowerCase().includes(query)
            )
            .map((user: IUser) => <UserCard {...user} key={user.uid} />)}
      </div>
    </div>
  );
};

export default UserPages;
