import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { bd, auth } from '../api/config';
import { IUser } from '../Types/User';
import { useParams, Navigate } from 'react-router-dom';
import { HandleUserActions } from '../api/Socials';

const MainPage = ({ currentUser }: any) => {
  const { id } = useParams();
  const uid = id || auth.currentUser?.uid;
  const [user, setUser] = useState({
    fullname: 'Setup your profile',
    age: 'go to settings!',
  } as IUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const dbRef = ref(bd, uid);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        setUser(data);
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

  const stockPhoto =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000';
  return (
    <>
      <div className="  bg-[#50597b]  rounded-xl flex justify-center">
        <div className="flex flex-col justify-start w-48 m-10 ml-16 text-white">
          <p className="font-bold text-2xl text-center">
            {user && user.fullname}, {user && user.age}
          </p>
          <img
            src={user.url || stockPhoto}
            className="w-[170px] h-40 rounded-md"
            alt="avatar"
          />
          <p className="text-center">
            {following && following.length} followings,
            <br />
            {followers && followers.length} followers
          </p>
          <p className="pt-5 text-sm">{user && user.status}</p>
          <div className="mt-10 flex flex-row">
            <button
              className={`uppercase mr-1 p-2 bg-[#13a7ab] rounded ${
                id === auth.currentUser?.uid ? 'hidden' : ''
              }`}
            >
              {' '}
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
      </div>
    </>
  );
};

export default MainPage;
