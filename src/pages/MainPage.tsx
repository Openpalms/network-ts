import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { bd, auth } from '../api/config';
import { IUser } from '../Types/User';
import { useNavigate, useParams } from 'react-router-dom';
import { HandleUserActions } from '../api/Socials';
import RightBar from '../components/RightBar';
import loader from '../assets/images/loader.svg';
import defaultImage from '../assets/images/defaultImage.webp';

const MainPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const uid = id || auth.currentUser?.uid;
  const [user, setUser] = useState({
    fullname: 'Setup your profile',
    age: 'go to settings!',
  } as IUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const dbRef = ref(bd, uid);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setUser(data);
        setLoading(false);
      }
      if (data === null) {
        setLoading(false);
      }
    });
  }, [uid]);

  useEffect(() => {
    const isUserFollowing =
      user.followers &&
      auth.currentUser?.uid !== undefined &&
      Object.keys(user.followers).includes(auth.currentUser?.uid);
    setIsFollowing(isUserFollowing);

    //formating followers data to count subscribers
    user.followers &&
      setFollowers(Object.assign([], Object.values(user.followers)));
    user.following &&
      setFollowing(Object.assign([], Object.values(user.following)));

    ///forcing UI update if no followers/ings to prevent data save from other user
    user.followers === undefined && setFollowers([]);
    user.following === undefined && setFollowing([]);
  }, [user]);

  const handleFollow = () => {
    HandleUserActions.followUser(id, auth.currentUser?.uid);
    HandleUserActions.setFollowing(id, auth.currentUser?.uid);
  };
  const handleUnfollow = () => {
    HandleUserActions.unfollowUser(auth.currentUser?.uid, id);
    HandleUserActions.setUnfollow(auth.currentUser?.uid, id);
  };

  return (
    <>
      <div className="  bg-[#04724D]  rounded-xl flex justify-around flex-col xl:flex-row  ">
        {loading && (
          <img
            src={loader}
            alt="loading"
            className="h-[50%] w-[50%] self-center"
          />
        )}
        <div className="flex flex-col justify-start w-fit m-10 text-white self-center ">
          <p className="font-bold text-2xl text-center">
            {user && user.fullname}, {user && user.age}
          </p>
          <img
            src={user.url || defaultImage}
            className="w-[170px] h-40 rounded-md self-center"
            alt="avatar"
          />
          <p className="text-center">
            {following && following.length} followings,
            <br />
            {followers && followers.length} followers
          </p>
          <hr />
          <span className="pt-5 text-sm">
            {user.status ? (
              <p className="text-center">{user.status}</p>
            ) : (
              <p className="italic opacity-60 text-center">no status yet...</p>
            )}
          </span>
          <div className="mt-10 flex flex-row">
            <button
              className={`uppercase mr-1 p-2 bg-[#13a7ab] rounded ${
                id === auth.currentUser?.uid ? 'hidden' : ''
              }`}
              onClick={() => {
                navigate('/messages');
              }}
            >
              message
            </button>
            {/* checking if current user already following this user and it's not his own page */}
            {!isFollowing ? (
              <button
                className={`uppercase mr-1 p-2 bg-[#13a7ab] rounded ${
                  id === auth.currentUser?.uid ? 'hidden' : ''
                }`}
                onClick={handleFollow}
              >
                follow
              </button>
            ) : (
              <>
                <button
                  className={`uppercase mr-1 p-2 bg-[#13a7ab] rounded ${
                    id === auth.currentUser?.uid ? 'hidden' : ''
                  }`}
                  onClick={handleUnfollow}
                >
                  unfollow
                </button>
              </>
            )}
          </div>
        </div>

        <RightBar />
      </div>
    </>
  );
};

export default MainPage;
