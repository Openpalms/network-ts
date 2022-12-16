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
          function (item: any) {
            return item.createAt;
          },
          ['desc']
        );
        setPosts(ordered);
      } else setPosts(null as unknown as IPost[]);
    });
  }, [uid]);

  return (
    <div className=" bg-[#50597b] w-[100%] h-[500px] flex flex-col items-center text-white">
      <div className=" w-[100%] h-[10%] mb-2  rounded-t-md text-center uppercase border-b">
        feed
      </div>
      <div className=" rounded-t-lg text-black overflow-scroll h-100 flex flex-col gap-5 p-2">
        {posts &&
          posts.map((item: IPost) => <Posts key={item.postId} {...item} />)}
      </div>
      <div className=" w-[100%] h-[1%]  bg-white  text-center uppercase"></div>
      <div className="flex justify-between w-[100%] outline-none">
        {isMyPage && (
          <>
            <textarea
              className="resize-none h-[5rem] text-[#13a7ab] p-2 bg-transparent border outline-none"
              placeholder="Share something!"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              onKeyDown={(e) => {
                e.key === 'Enter' && CreateNewPost(postBody);
              }}
            />
            <button
              className="border w-[50%] h-[50%] hover:bg-[#13a7ab] transition-all"
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
