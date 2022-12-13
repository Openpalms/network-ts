export interface IPost {
  postId: string;
  authorId: string | undefined;
  postBody: string;
  likesCount: any;
  // likesCount: string[];
  createAt: string;
}
