import { useState } from 'react';

const Settings = () => {
  const [progress, setProgress] = useState('h-[10%]');
  return (
    <div className="flex justify-center ">
      <div className="  bg-[#50597b]  rounded-xl flex justify-around">
        <form className="flex flex-col justify-start w-48 m-10 ml-16 text-white">
          <input
            type="file"
            className="block w-full text-sm text-[#50597b]
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-[#13a7ab]
      hover:file:bg-violet-100"
          />
          <input
            className="mt-10 bg-transparent outline-none border-b-4 border-[#13a7ab] placeholder:text-lg  "
            placeholder="Enter your fullname"
            onFocus={() => setProgress('h-[30%]')}
          />
          <input
            className="mt-10 bg-transparent outline-none border-b-4 border-[#13a7ab] placeholder:text-lg"
            placeholder="enter your age"
            onFocus={() => setProgress('h-[50%]')}
          />
          <textarea
            className="mt-10 bg-transparent outline-none border-b-4 border-[#13a7ab] placeholder:text-lg resize-none"
            placeholder="status"
            onFocus={() => setProgress('h-[75%]')}
          />
          <button
            className="mt-10 bg-[#13a7ab] h-10 rounded uppercase hover:shadow-2xl hover:bg-[#17c0c5] transition-all"
            onClick={(e) => {
              e.preventDefault();
              setProgress('h-[100%]');
            }}
          >
            save
          </button>
        </form>
        <div className="flex flex-col justify-start w-[50%] p-10 ">
          <div
            className={`${progress} w-[10%] border transition-all border-[#13a7ab]`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
