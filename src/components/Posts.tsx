import like from '../assets/images/like.svg';
import { IPost } from '../Types/Post';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
dayjs.extend(relativeTime);
const Posts = (props: IPost) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const DayJs = dayjs().format('YYYY/MM/DD');
    const createAt = dayjs(props.createAt).format('YYYY/MM/DD');
    const difference = dayjs(createAt).from(DayJs);
    setTime(difference);
  }, []);

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
      <div className="flex items-center">
        <p className="ml-2 text-lg text-[#13a7ab]"> {props.likesCount}</p>
        <img
          src={like}
          className="w-10 h-10 hover:scale-150	transition-all "
          onClick={() => console.log(props)}
        />
        <p className="text-xs	">{time}</p>
      </div>
      <hr />
    </>
  );
};

export default Posts;
