import { IUser } from '../Types/User';

const UserCard = (props: IUser) => {
  return (
    <div className="flex my-5 mx-5 border justify-start items-center rounded  ">
      <img
        src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
        alt="avatar"
        className="h-20 w-20"
      />
      <h3 className="text-white w-[40%]">
        {props.fullname}, {props.age}
      </h3>
      <div className="flex justify-end w-[60%]  h-[100%]">
        <button className="bg-[#13a7ab] border-r-4 text-white w-[100%]">
          visit <br />
          profile
        </button>
        <button className="bg-[#13a7ab] w-[100%] text-white">chat</button>
      </div>
    </div>
  );
};
export default UserCard;
