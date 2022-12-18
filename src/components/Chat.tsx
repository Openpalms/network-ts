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
      <div className="flex flex-col w-full h-[80vh] relative overflow-scroll">
        {/* <div className="overflow-scroll"> */}
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
          {/* <Message />
          <Message />
          <Message />
          <Message /> */}
        </div>
        <input
          className="h-20 w-[55vw] p-2 absolute bottom-0"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          className="border-l-8 border-[#13a7ab] bg-[#13a7ab] absolute bottom-0 right-0 h-20 uppercase"
          onClick={() => {
            handleMessageSent(auth.currentUser!.uid, props.id, message);
            setMessage('');
          }}
        >
          send
        </button>
      </div>
    </>
  );
}

export default Chat;
