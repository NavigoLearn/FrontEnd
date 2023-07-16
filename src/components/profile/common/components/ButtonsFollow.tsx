import React, { useEffect, useState } from 'react';
import userDisplay from '@store/user/user-display';
import loggedUser from '@store/user/logged-user';
import {
  fetchFollowUser,
  fetchUnfollowUser,
} from '../../../../api-wrapper/user/user';

const ButtonsFollow = ({ reqAgain }: { reqAgain: () => void }) => {
  const [loaded, setLoaded] = useState(false);
  const [following, setFollowing] = useState(false);
  const { userId, isFollowing } = userDisplay.get();

  useEffect(() => {
    // fetch roadmap-roadmap-data
    if (userId === '') {
      return;
    }
    setLoaded(true);
    setFollowing(isFollowing);

    // setLoaded(true);
  }, [userId]);

  return (
    <>
      {loaded && following && (
        <button
          onClick={() => {
            // unfollows user
            fetchUnfollowUser(userId).then(() => {
              setFollowing(false);
              reqAgain();
            });
          }}
          type='button'
        >
          <div className='text-md hover:underline text-white font-normal py-2 px-16 bg-primary rounded-3xl mt-4 font-roboto-text select-none'>
            Unfollow
          </div>
        </button>
      )}
      {loaded && !following && (
        <button
          onClick={() => {
            // folllows user
            fetchFollowUser(userId).then(() => {
              // if user is logged in
              if (loggedUser.get().userId === '') {
                // redirect to /login
                window.location.href = '/login';
                return;
              }
              setFollowing(true);
              reqAgain();
            });
          }}
          type='button'
        >
          <div className='text-md hover:underline text-white font-normal py-2 px-16 bg-primary rounded-3xl mt-4 font-roboto-text select-none'>
            Follow
          </div>
        </button>
      )}
      {!loaded && (
        <div className='text-md hover:underline text-white font-normal py-2 px-16 bg-primary rounded-3xl mt-4 font-roboto-text'>
          getting data...
        </div>
      )}
    </>
  );
};

export default ButtonsFollow;
