import React, { useEffect, useState } from 'react';
import Message from './Message';
import { auth } from '../api/config';
import { HandleGetMessages, handleMessageSent } from '../api/Socials';
import { FirestoreDB } from '../api/config';
import { IMessage } from '../Types/Message';
import { doc, onSnapshot } from 'firebase/firestore';
function Chat(props: any) {
  const [message, setMessage] = useState('');
  const [dialog, setDialog] = useState<IMessage[]>([]);
  const combinedId = auth.currentUser!.uid + props.id;
  const reversedId = props.id + auth.currentUser!.uid;
  useEffect(() => {
    ///checking if dialog is in db with reversedID
    const unSub = onSnapshot(doc(FirestoreDB, 'chats', reversedId), (doc) => {
      doc.exists() && setDialog(doc.data().messages);
    });
    ///if dialog is not reversedId then it's straight forward id
    const unSubId = onSnapshot(doc(FirestoreDB, 'chats', combinedId), (doc) => {
      doc.exists() && setDialog(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [reversedId, combinedId]);
  return (
    <>
      <div className="flex flex-col w-full h-[80vh]  justify-end">
        <div className="flex flex-col overflow-scroll mb-5 ">
          {dialog.map((m) => (
            <Message
              text={m.text}
              key={m.id}
              date={m.date}
              id={m.id}
              senderId={m.senderId}
            />
          ))}
          {dialog.length === 0 && (
            <p className="self-center justify-self-center text-white">
              No messages yet.
            </p>
          )}
        </div>
        <div className="flex">
          <input
            className="h-[85px] w-[55vw] p-2 justify-self-end self-center outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => {
              e.key === 'Enter' &&
                handleMessageSent(auth.currentUser!.uid, props.id, message);
              e.key === 'Enter' && setMessage('');
            }}
          />
          <button
            className="border bg-[#13a7ab] h-full w-[100px] uppercase outline-none hover:bg-white transition-all"
            onClick={() => {
              handleMessageSent(auth.currentUser!.uid, props.id, message);
              setMessage('');
            }}
          >
            send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
