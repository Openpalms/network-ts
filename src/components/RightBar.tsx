import Posts from './Posts';
import { AddNewPost } from '../HandleChanges/UserAuth';
import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import _ from 'lodash';
import { bd, auth } from '../api/config';
import { IPost } from '../Types/Post';
import { useParams } from 'react-router-dom';

const RightBar = () => {
  let { id } = useParams();
  const uid = id || auth.currentUser?.uid;
  const isMyPage = id === auth.currentUser?.uid;
  const { CreateNewPost, setPostBody, postBody } = AddNewPost();
  const [posts, setPosts] = useState(null as unknown as IPost[]);

  useEffect(() => {
    const postref = ref(bd, uid + '/posts/');
    onValue(postref, (snapshot) => {
      const dbPosts = snapshot.val();
      if (dbPosts !== null) {
        const formatedData = Object.assign([], Object.values(dbPosts));
        const ordered = _.orderBy(
          formatedData,
          function (item: IPost) {
            return item.createAt;
          },
          ['desc']
        );
        setPosts(ordered);
      } else setPosts(null as unknown as IPost[]);
    });
  }, [uid]);

  return (
    <div className=" bg-[#F4F4F9] w-[100%] h-[500px] flex flex-col items-center text-white border m-5 rounded-md max-[600px]:m-0 p-2">
      <div className=" w-[100%] h-[10%] mb-2  rounded-t-md text-center uppercase border-b text-[#04724D]">
        feed
      </div>
      <div className=" rounded-t-lg text-black overflow-scroll h-full flex flex-col gap-5 p-2 w-full">
        {posts &&
          posts.map((item: IPost) => <Posts key={item.postId} {...item} />)}
      </div>
      <div className="flex justify-between  outline-none w-full  self-end">
        {isMyPage && (
          <>
            <textarea
              className="resize-none h-[5rem] text-black p-2 bg-transparent border outline-none w-[70%] focus:bg-[#ffffff] transition-all  self-end"
              placeholder="Share something!"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              onKeyDown={(e) => {
                e.key === 'Enter' && CreateNewPost(postBody);
              }}
            />
            <button
              className="border w-[50%] bg-[#04724D] hover:bg-[#116247] transition-all h-[100%]  self-end"
              onClick={(e) => CreateNewPost(postBody)}
            >
              post
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RightBar;
