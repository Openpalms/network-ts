import React from 'react';
import Message from './Message';
function Chat(props: any) {
  return (
    <>
      <div className="flex flex-col w-full h-[80vh] relative overflow-scroll">
        <div className="flex flex-col overflow-scroll">
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <input className="h-20 w-[55vw] p-2 absolute bottom-0 " />
        <button className="border-l-8 border-[#13a7ab] bg-[#13a7ab] absolute bottom-0 right-0 h-20 uppercase">
          send
        </button>
      </div>
    </>
  );
}

export default Chat;
