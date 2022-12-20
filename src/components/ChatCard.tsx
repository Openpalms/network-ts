import { FirestoreDB } from '../api/config';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth } from '../api/config';
import { handleSelectUser } from '../api/Socials';
import { IMessage } from '../Types/Message';
import { ChatProps } from '../Types/Props';

const ChatCard = (props: ChatProps) => {
  const [dialog, setDialog] = useState<IMessage[]>([]);
  const [lastMessage, setLastMessage] = useState('');
  const stockPhoto =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000';
  const combinedId = auth.currentUser!.uid + props.uid;
  const reversedId = props.uid + auth.currentUser!.uid;
  useEffect(() => {
    const unSub = onSnapshot(doc(FirestoreDB, 'chats', reversedId), (doc) => {
      doc.exists() && setDialog(doc.data().messages);
    });
    const unSubId = onSnapshot(doc(FirestoreDB, 'chats', combinedId), (doc) => {
      doc.exists() && setDialog(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [reversedId, combinedId]);
  useEffect(() => {
    dialog[dialog.length - 1] && setLastMessage(dialog[dialog.length - 1].text);
  }, [dialog]);
  return (
    <div
      className={`flex border 
      w-full
      justify-start items-center cursor-pointer hover:bg-[#0B3142] hover:border-[#0B3142] transition-all 
      ${props.uid === props.chatId ? 'bg-[#0B3142]' : ''}
      `}
      onClick={() => handleSelectUser(auth.currentUser!.uid, props.uid!)}
    >
      <img
        src={props.url || stockPhoto}
        alt="avatar"
        className="h-20 w-20 mr-2"
      />
      <div className="flex flex-col w-[50%] ">
        <h3 className="text-white break-words">{props.fullname}</h3>
        <p className="italic opacity-70 text-sm text-white break-words">
          {lastMessage && lastMessage.slice(0, 15) + '...'}
        </p>
      </div>
    </div>
  );
};
export default ChatCard;
