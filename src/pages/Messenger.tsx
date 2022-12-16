import React from 'react';
import UserCard from '../components/UserCard';

function Messenger() {
  return (
    <div className="flex  relative  h-[100%] bg-[#50597b]  rounded-xl  overflow-y-scroll ">
      <div className="border-r w-[20rem] h-[30rem] overflow-x-scroll flex flex-col"></div>
      <div className="  w-[100%] h-[100%] overflow-x-scroll flex flex-col items-end justify-end">
        <div className="">
          <div className=" bg-blue-300 m-5">
            <p>message</p>
          </div>
          <div className=" bg-blue-300 m-5">
            <p>message</p>
          </div>
          <div className=" bg-blue-300 m-5">
            <p>message</p>
          </div>
          <div className=" bg-blue-300 m-5">
            <p>message</p>
          </div>
        </div>
        <div className="">
          <textarea />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
