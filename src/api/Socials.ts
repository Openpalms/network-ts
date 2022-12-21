import { bd, auth } from './config';
import { ref, remove, set, update } from 'firebase/database';
import { useState } from 'react';
import { IUser } from '../Types/User';
import { IPost } from '../Types/Post';
import { FirestoreDB } from '../api/config';
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { IMessage } from '../Types/Message';
export const HandleUserActions = {
  logoutUser() {
    auth.signOut();
  },

  addUserInfo(body: IUser) {
    set(ref(bd, `${body.uid}/`), { ...body });
  },
  updateUserStatus(uid: string | undefined, status: string) {
    update(ref(bd, `${uid}/`), { status: status });
  },
  addUserPhoto(uid: string, url: string) {
    update(ref(bd, `${uid}/`), {
      url: url,
    });
  },
  addPost(post: IPost) {
    update(ref(bd, `${post.authorId}/posts/${post.postId}`), { ...post });
  },
  like(post: IPost, uid: string | undefined) {
    update(ref(bd, `${post.authorId}/posts/${post.postId}/likesCount/${uid}`), {
      uid,
    });
  },
  disLike(post: IPost, uid: string | undefined) {
    remove(ref(bd, `${post.authorId}/posts/${post.postId}/likesCount/${uid}/`));
  },
  followUser(uid: string | undefined, personId: string | undefined) {
    update(ref(bd, `${uid}/followers/${personId}/`), {
      personId,
    });
  },
  setFollowing(uid: string | undefined, personId: string | undefined) {
    update(ref(bd, `${personId}/following/${uid}/`), {
      uid,
    });
  },
  unfollowUser(uid: string | undefined, personId: string | undefined) {
    remove(ref(bd, `${personId}/followers/${uid}/`));
  },
  setUnfollow(personId: string | undefined, uid: string | undefined) {
    remove(ref(bd, `${personId}/following/${uid}/`));
  },
};

export const handleSelectUser = async (
  currentId: string,
  selectedId: string
) => {
  const combinedId = currentId! + selectedId!;
  const reversedId = selectedId + currentId;
  try {
    const docRef = doc(FirestoreDB, 'chats', combinedId);
    const res = await getDoc(docRef);
    if (!res.exists()) {
      //create a chat in chats collection
      const docRef = doc(FirestoreDB, 'chats', reversedId);
      const res = await getDoc(docRef);
      if (!res.exists()) {
        await setDoc(doc(FirestoreDB, 'chats', combinedId), { messages: [] });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleMessageSent = async (
  currentId: string,
  selectedId: string,
  text: string
) => {
  if (text.length === 0 || text.trim().length === 0) return;
  const combinedId = currentId + selectedId;
  const reversedId = selectedId + currentId;
  try {
    const docRef = doc(FirestoreDB, 'chats', combinedId);
    const res = await getDoc(docRef);
    if (!res.exists()) {
      await updateDoc(doc(FirestoreDB, 'chats', reversedId), {
        messages: arrayUnion({
          id: nanoid(),
          text,
          senderId: currentId,
          date: Timestamp.now().toDate().toDateString(),
        }),
      });
    }
    await updateDoc(doc(FirestoreDB, 'chats', combinedId), {
      messages: arrayUnion({
        id: nanoid(),
        text,
        senderId: currentId,
        date: Timestamp.now().toDate().toDateString(),
      }),
    });
  } catch {}
};

export const GetLastmessage = () => {
  const [lastMessage, setLastMessage] = useState(null as unknown as IMessage);
  return {
    lastMessage,
    setLastMessage,
  };
};

export const handleDeleteMessage = async (
  dialog: IMessage[],
  currentId: string,
  messageId: string,
  chatId: string
) => {
  if (currentId !== auth.currentUser!.uid) return;
  try {
    console.log('deleting');
    const docRef = doc(FirestoreDB, 'chats', chatId);
    const res = await getDoc(docRef);
    if (!res.exists()) {
      console.log('empty');
    }
    await updateDoc(doc(FirestoreDB, 'chats', chatId), {
      messages: dialog.filter((m) => m.id !== messageId),
    });
  } catch (e) {
    console.log(e);
  }
};

export const HandleThemeChange = () => {
  const [isLight, setIsLight] = useState(false);
  return {
    isLight,
    setIsLight,
  };
};
