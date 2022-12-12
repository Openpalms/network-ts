export interface IPost {
  postId: string;
  authorId: string | undefined;
  postBody: string;
  likesCount: number;
  createAt: string;
}
