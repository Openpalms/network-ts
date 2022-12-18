import dayjs from 'dayjs';
import React from 'react';
import { auth } from '../api/config';
import { IMessage } from '../Types/Message';

function Message(props: IMessage) {
  console.log(props.date);
  return (
    <div
      className={`rounded  bg-[white] w-[20%]  p-3 m-2 ${
        props.senderId === auth.currentUser?.uid
          ? 'bg-[green] self-end'
          : 'bg-[red] self-start'
      }`}
    >
      <p className="text-white p-2 ">{props.text}</p>
    </div>
  );
}

export default Message;
