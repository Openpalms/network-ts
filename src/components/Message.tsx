import { useRef, useEffect } from 'react';
import { auth } from '../api/config';
import { handleDeleteMessage } from '../api/Socials';
import { MessageProps } from '../Types/Props';
import bin from '../assets/images/bin.svg';
import dayjs from 'dayjs';

function Message(props: MessageProps) {
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div
      className={`rounded-md  bg-[white] max-w-md  p-3 m-2  ${
        props.senderId === auth.currentUser?.uid
          ? 'bg-[#D6D3F0] self-end mr-5 '
          : 'bg-[#0B3142] self-start ml-5'
      }`}
      ref={ref}
    >
      <p
        className={`text-white p-2
      ${props.senderId === auth.currentUser?.uid && 'text-black '}
      `}
      >
        {props.text}
      </p>
      <div className="flex justify-end">
        {dayjs(props.date).format('DD/MM/YYYY')}
        {props.senderId === auth.currentUser!.uid && (
          <img
            src={bin}
            onClick={() =>
              handleDeleteMessage(
                props.dialog,
                props.senderId,
                props.id,
                props.chatId
              )
            }
            className="h-8 "
            alt=""
          />
        )}
      </div>
    </div>
  );
}

export default Message;
