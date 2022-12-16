import { IPost } from './Post';

export interface IUser {
  uid: string | undefined;
  fullname: string;
  age: string;
  status: string;
  posts?: IPost;
  url?: string;
  followers?: any;
  following?: any;
}

interface IFollower {
  uid: string;
  messages?: Array<string>;
}
