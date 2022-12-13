import like from '../assets/images/like.svg';
import { IPost } from '../Types/Post';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { HandleUserActions } from '../api/Socials';
import { auth } from '../api/config';

import filledHeart from '../assets/images/filledHeart.svg';
dayjs.extend(relativeTime);

const Posts = (props: IPost) => {
  const uid = auth.currentUser?.uid;

  const [time, setTime] = useState('');
  const [likes, setLikes] = useState([]);
  const [unlike, setUnlikes] = useState([]);
  useEffect(() => {
    const DayJs = dayjs().format('YYYY/MM/DD');
    const formatedDate = props.createAt.slice(0, 10);
    const difference = dayjs(formatedDate).from(DayJs);
    setTime(difference);
  }, [props.createAt]);
  useEffect(() => {
    props.likesCount &&
      setLikes(Object.assign([], Object.values(props.likesCount)));
    props.likesCount &&
      setUnlikes(
        Object.assign([], Object.values(props.likesCount)).filter(
          (item: any) => item.uid === uid
        )
      );
  }, [props.likesCount, uid]);
  return (
    <>
      <div className="flex">
        <img
          src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
          alt="avatar"
          className="h-10 w-10 "
        />
        <p className="ml-5">{props.postBody}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="ml-2 text-lg text-[#13a7ab] flex items-center">
          <span className="w-[0.5rem]">{likes && likes.length - 1}</span>
          {unlike.length > 0 ? (
            <img
              src={filledHeart}
              className="w-10 h-10 hover:scale-150	transition-all ml-2"
              onClick={() => HandleUserActions.disLike(props, uid)}
              alt="avatar"
            />
          ) : (
            <img
              src={like}
              className="w-10 h-10 hover:scale-150	transition-all ml-2"
              onClick={() => HandleUserActions.like(props, uid)}
              alt="avatar"
            />
          )}
        </p>
        <p className="text-xs	">{time}</p>
      </div>
      <hr />
    </>
  );
};

export default Posts;
