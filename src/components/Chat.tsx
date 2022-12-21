import { useEffect, useState } from 'react';
import Message from './Message';
import { auth } from '../api/config';
import { handleMessageSent } from '../api/Socials';
import { FirestoreDB } from '../api/config';
import { IMessage } from '../Types/Message';
import { doc, onSnapshot } from 'firebase/firestore';
import { ChatIdProps } from '../Types/Props';
import loader from '../assets/images/loader.svg';
function Chat({ id, setId }: ChatIdProps) {
  const [message, setMessage] = useState('');
  const [dialog, setDialog] = useState<IMessage[]>([]);
  const [chatId, setChatId] = useState('');
  const [loading, setLoading] = useState(false);
  const combinedId = auth.currentUser!.uid + id;
  const reversedId = id + auth.currentUser!.uid;
  useEffect(() => {
    setLoading(true);
    ///checking if dialog is in db with reversedID
    const unSub = onSnapshot(doc(FirestoreDB, 'chats', reversedId), (doc) => {
      doc.exists() && setDialog(doc.data().messages);
      doc.exists() && setChatId(reversedId);
      setLoading(false);
    });
    ///if dialog is not reversedId then it's straight forward id
    const unSubId = onSnapshot(doc(FirestoreDB, 'chats', combinedId), (doc) => {
      doc.exists() && setDialog(doc.data().messages);
      doc.exists() && setChatId(combinedId);
      setLoading(false);
    });
    return () => {
      unSub();
      unSubId();
    };
  }, [reversedId, combinedId]);

  return (
    <>
      <div className="flex flex-col w-full h-[80vh]  justify-end bg-[#B8DBD9]">
        <p
          className="absolute top-0 z-10 cursor-pointer md:hidden"
          onClick={() => setId!('')}
        >
          ←
        </p>
        <div className="flex flex-col overflow-scroll mb-5 ">
          {loading && (
            <img
              src={loader}
              alt="loading"
              className="h-[50%] w-[50%] self-center"
            />
          )}
          {dialog.map((m) => (
            <Message
              text={m.text}
              key={m.id}
              date={m.date}
              id={m.id}
              senderId={m.senderId}
              chatId={chatId}
              dialog={dialog}
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
            className="h-[85px]  w-full md:w-[55vw] p-2 justify-self-end self-center outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => {
              e.key === 'Enter' &&
                handleMessageSent(auth.currentUser!.uid, id, message);
              e.key === 'Enter' && setMessage('');
            }}
          />
          <button
            className="border bg-[#04724D] h-full w-[33%] md:w-[100px]  uppercase outline-none hover:bg-white transition-all text-white
            hover:text-black"
            onClick={() => {
              handleMessageSent(auth.currentUser!.uid, id, message);
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
