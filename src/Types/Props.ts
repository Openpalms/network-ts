import { IMessage } from './Message';
import { IUser } from './User';

export interface MessageProps extends IMessage {
  chatId: string;
  dialog: IMessage[];
}
export interface ChatProps extends IUser {
  chatId: string;
}
export interface ChatIdProps {
  id: string;
}
export interface PaginationProps {
  totalUsers: number;
  usersPerPage: number;
  setCurrentPage: (arg: number) => void;
  currentPage: number;
}
export interface Routes {
  children: JSX.Element;
}
