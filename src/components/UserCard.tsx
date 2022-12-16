import { IUser } from '../Types/User';
import { NavLink } from 'react-router-dom';
const UserCard = (props: IUser) => {
  const stockPhoto =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000';
  return (
    // <NavLink to={'/' + props.uid}>
    <div className="flex my-5 mx-5 border justify-start items-center rounded  ">
      <img
        src={props.url || stockPhoto}
        alt="avatar"
        className="h-20 w-20 mr-2"
      />
      <h3 className="text-white w-[40%]">
        {props.fullname}, {props.age}
      </h3>
      <div className="flex justify-end w-[60%] h-[100%] mr-5"></div>
    </div>
    // </NavLink>
  );
};
export default UserCard;
