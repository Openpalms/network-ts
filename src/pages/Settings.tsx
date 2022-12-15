import { useState } from 'react';
import {
  SetUserProfile,
  UpdateStatus,
  uploadFiles,
} from '../HandleChanges/UserAuth';
const Settings = () => {
  const [progress, setProgress] = useState('h-[10%]');
  const [file, setFile] = useState('' as any);
  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setProgress('h-[100%]');
    if (status !== '') {
      submitStatus(status);
    }
    if (file !== null) {
      uploadFiles(file);
    }
  };
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setFile(e.target.files[0]);
  };
  const { setStatus, status, submitStatus } = UpdateStatus();
  return (
    <div className="flex justify-center ">
      <div className="  bg-[#50597b]  rounded-xl flex justify-around">
        <form className="flex flex-col justify-start w-48 m-10 ml-16 text-white">
          <p className="mb-5"> Set up your photo:</p>
          <input
            type="file"
            className="block w-full text-sm text-[#50597b]
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-[#13a7ab]
      hover:file:bg-violet-100"
            onChange={onUpload}
          />
          {file ? (
            <p className="mt-5">File uploaded, click button to save</p>
          ) : (
            <p className="mt-5">You did not choose file yet</p>
          )}
          {/* <input
            className="mt-10 bg-transparent outline-none border-b-4 border-[#13a7ab] placeholder:text-lg  "
            placeholder="Enter your fullname"
            onFocus={() => setProgress('h-[30%]')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          /> */}
          {/* <input
            className="mt-10 bg-transparent outline-none border-b-4 border-[#13a7ab] placeholder:text-lg"
            placeholder="enter your age"
            onFocus={() => setProgress('h-[50%]')}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          /> */}
          <textarea
            className="mt-10 bg-transparent outline-none border-b-4 border-[#13a7ab] placeholder:text-lg resize-none"
            placeholder="status"
            onFocus={() => setProgress('h-[75%]')}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button
            className="mt-10 bg-[#13a7ab] h-10 rounded uppercase hover:shadow-2xl hover:bg-[#17c0c5] transition-all"
            onClick={handleButtonClick}
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
      {/* <button
        className="mt-10 bg-[#13a7ab] h-10 rounded uppercase hover:shadow-2xl hover:bg-[#17c0c5] transition-all"
        onClick={(e) => {
          e.preventDefault();
          uploadFiles(file);
        }}
      >
        test
      </button> */}
    </div>
  );
};

export default Settings;
