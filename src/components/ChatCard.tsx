import { FirestoreDB } from '../api/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { IUser } from '../Types/User';
import { auth } from '../api/config';
const ChatCard = (props: any) => {
  // const ChatCard = (props: IUser) => {
  const HandleSelect = async () => {
    const combinedId = auth.currentUser!.uid + props.uid;
    try {
      const docRef = doc(FirestoreDB, 'chats', combinedId);
      const res = await getDoc(docRef);
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(FirestoreDB, 'chats', combinedId), { messages: [] });

        ///create a users Chat
        await updateDoc(doc(FirestoreDB, 'userChats', auth.currentUser!.uid), {
          [combinedId + '.userInfo']: {
            uid: props.uid,
            name: props.fullname,
            photo: props.url,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(FirestoreDB, 'userChats', props.uid!), {
          [combinedId + '.userInfo']: {
            uid: auth.currentUser!.uid,
            name: props.currentUser.fullname,
            photo: props.currentUser.url,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {}

    //create User Chats
  };

  const stockPhoto =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000';
  return (
    <div
      className="flex my-5 mx-5 border justify-start items-center rounded"
      onClick={HandleSelect}
    >
      <img
        src={props.url || stockPhoto}
        alt="avatar"
        className="h-20 w-20 mr-2"
      />
      <h3 className="text-white w-[40%]">
        {props.fullname}, {props.age}
      </h3>
      <div className="flex justify-end w-[60%] h-[100%] mr-5"></div>
    </div>
  );
};
export default ChatCard;
