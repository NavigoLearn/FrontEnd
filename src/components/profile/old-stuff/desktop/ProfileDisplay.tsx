import React, { RefObject, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import userDisplay, { fetchUserAndSetStore } from '@store/user/user-display';
import Bio from '@components/profile/old-stuff/common/components/Bio';
import WebsiteUrl from '@components/profile/old-stuff/common/components/WebsiteUrl';
import Quote from '@components/profile/old-stuff/common/components/Quote';
import Label from '@components/profile/old-stuff/common/components/Label';
import Follow from '@components/profile/old-stuff/common/components/Follow';
import Name from '@components/profile/old-stuff/common/components/Name';
import Statistics from '@components/profile/old-stuff/common/components/Statistics';
import ButtonsEdit from '@components/profile/old-stuff/common/components/ButtonsEdit';
import loggedUser from '@store/user/logged-user';
import ButtonsFollow from '@components/profile/old-stuff/common/components/ButtonsFollow';
import {
  postBioData,
  postNameData,
  postQuoteData,
  postWebsiteUrlData,
} from '@src/api-wrapper/user/user';

type asyncCb = () => Promise<void>;
const ProfileDisplay = ({ id }: { id: string }) => {
  const userData = useStore(userDisplay);
  const [_, setRender] = useState(false);
  const [requestAgain, setRequestAgain] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);

  const [asyncCallbackList, setAsyncCallbackList] = useState<asyncCb[]>([]);

  useEffect(() => {
    fetchUserAndSetStore(id)
      .then(() => {
        // sets userDisplay roadmap-roadmap-data and loads it into profile
        setRender((prev) => !prev);
        setLoaded(true);
      })
      .catch((err) => {
        if (err.message === 'User not found') {
          window.location.href = '/profile';
        }
      });
  }, []);

  useEffect(() => {
    if (loaded === false) return;
    fetchUserAndSetStore(id).then(() => {
      setRender((prev) => !prev);
      setEdit(false);
    });
  }, [requestAgain]);

  function setProfileUrl() {
    if (!loaded) return '';
    return userData.profilePictureUrl === ''
      ? 'https://media.istockphoto.com/id/470100848/ro/vector/pictograma-profilului-masculin-alb%C4%83-pe-fundal-albastru.jpg?s=612x612&w=0&k=20&c=-We-8zY-Oj7MMSuKwpOEkm7QUX8Gnc4Bk0KcBIO8lYY='
      : userData.profilePictureUrl;
  }

  return (
    <>
      <div className='flex justify-between w-10/12 mt-44 items-center text-center'>
        <div className='flex flex-col justify-center items-center w-full transform my-12'>
          <div className='w-60 h-60 xl:w-72 xl:h-72 absolute -top-80'>
            <img
              draggable='false'
              className='rounded-full w-full h-full flex select-none'
              src={setProfileUrl()}
              alt='profile'
            />
          </div>
          <Name
            edit={edit}
            originalValue={userData.name}
            saveRequest={(valueRef: RefObject<string>) => {
              setAsyncCallbackList((prev) => [
                ...prev,
                async () => {
                  // use valueRef
                  await postNameData(valueRef.current);
                },
              ]);
            }}
          />
          <Follow
            followerCount={userData.followerCount}
            followingCount={userData.followingCount}
          />
          <Label label='no label yet' />
          {loggedUser.get().userId === userDisplay.get().userId ? (
            <ButtonsEdit
              edit={edit}
              onEdit={() => {
                setEdit(true);
              }}
              onSave={() => {
                // calls all the callbacks and waits for all of them
                Promise.all(asyncCallbackList.map(async (cb) => cb())).then(
                  () => {
                    setRequestAgain((prev) => !prev);
                  }
                );
              }}
              onCancel={() => {
                setEdit(false);
              }}
            />
          ) : (
            <ButtonsFollow
              reqAgain={() => {
                setRequestAgain((prev) => !prev);
              }}
            />
          )}
          {edit || userData.quote ? (
            <Quote
              edit={edit}
              originalValue={userData.quote}
              saveRequest={(valueRef: RefObject<string>) => {
                setAsyncCallbackList((prev) => [
                  ...prev,
                  async () => {
                    // use valueRef
                    await postQuoteData(valueRef.current);
                  },
                ]);
              }}
            />
          ) : (
            <></>
          )}
          {edit || userData.websiteUrl ? (
            <WebsiteUrl
              edit={edit}
              originalValue={userData.websiteUrl}
              saveRequest={(valueRef: RefObject<string>) => {
                setAsyncCallbackList((prev) => [
                  ...prev,
                  async () => {
                    let value = valueRef.current;

                    // check if starts with http:// or https://
                    if (
                      !valueRef.current.startsWith('http://') &&
                      !valueRef.current.startsWith('https://')
                    ) {
                      value = `https://${valueRef.current}`;
                    }

                    if (value === 'https://') value = '';

                    // use valueRef
                    await postWebsiteUrlData(value);
                  },
                ]);
              }}
            />
          ) : (
            <></>
          )}
          <div className='w-full flex justify-center'>
            <Bio
              originalValue={userData.bio}
              edit={edit}
              saveRequest={(valueRef: RefObject<string>) => {
                // sets a callback that saves the new bio with the ref
                setAsyncCallbackList((prev) => [
                  ...prev,
                  async () => {
                    // use valueRef
                    await postBioData(valueRef.current);
                  },
                ]);
              }}
            />
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col justify-around my-24'>
        <Statistics roadmapsCount={userData.roadmapsCount} />
        <div className='flex justify-center  items-center'>
          <div className='text-4xl text-main opacity-20 select-none text-center w-5/6 '>
            We will add here some achivements at a later time. If you are one of
            the first users to join, be sure you will get some special rewards.
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDisplay;
