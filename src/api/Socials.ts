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
  onSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
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
  addUserPhoto(uid: any, url: any) {
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
  } catch (err) {}

  //create User Chats
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
      const docRef = doc(FirestoreDB, 'chats', reversedId);
      const res = await getDoc(docRef);
      await updateDoc(doc(FirestoreDB, 'chats', reversedId), {
        messages: arrayUnion({
          id: nanoid(),
          text,
          senderId: currentId,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(FirestoreDB, 'chats', combinedId), {
      messages: arrayUnion({
        id: nanoid(),
        text,
        senderId: currentId,
        date: Timestamp.now(),
      }),
    });
  } catch {}
};

export const HandleGetMessages = async (
  currentId: string,
  selectedId: string
) => {
  const [dialog, setDialog] = useState([]);
  const combinedId = currentId! + selectedId!;
  const reversedId = selectedId + currentId;
  const unsub = onSnapshot(doc(FirestoreDB, 'chats', reversedId), (doc) => {
    doc.exists() && setDialog(doc.data().messages);
  });

  // const docRef = doc(FirestoreDB, 'chats', reversedId);
  // const docSnap = await getDoc(docRef);
  // if (docSnap.exists()) {
  //   console.log(await docSnap.data().messages);
  // }

  // const unsub = onSnapshot(doc(FirestoreDB, 'chats', reversedId), (doc) => {
  //   console.log('Current data: ', doc.data());
  // });
};
