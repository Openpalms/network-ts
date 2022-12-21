import { IUser } from '../Types/User';
import { NavLink } from 'react-router-dom';
import defaultImage from '../assets/images/defaultImage.webp';
const UserCard = (props: IUser) => {
  return (
    <NavLink to={'/' + props.uid}>
      <div className="flex flex-col my-5 mx-5 border-black items-center rounded bg-[#F4F4F9]  ">
        <img
          src={props.url || defaultImage}
          alt="avatar"
          className="h-48 w-48 m-2 rounded"
        />
        <h3 className="text-[#04724D] my-5">
          {props.fullname}, {props.age}
        </h3>
        <div className="flex justify-end w-[60%] h-[100%] mr-5"></div>
      </div>
    </NavLink>
  );
};
export default UserCard;
