import dayjs from 'dayjs';
import React, { useRef, useEffect } from 'react';
import { auth } from '../api/config';
import { IMessage } from '../Types/Message';

function Message(props: IMessage) {
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div
      className={`rounded-md  bg-[white] max-w-md  p-3 m-2 ${
        props.senderId === auth.currentUser?.uid
          ? 'bg-[#9C92A3] self-end mr-5'
          : 'bg-[#0B3142] self-start ml-5'
      }`}
      ref={ref}
    >
      <p className="text-white p-2 ">{props.text}</p>
    </div>
  );
}

export default Message;
