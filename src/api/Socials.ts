import { bd, storage, auth } from './config';
import { ref, remove, set, update } from 'firebase/database';
import { IUser } from '../Types/User';
import { IPost } from '../Types/Post';

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
};
