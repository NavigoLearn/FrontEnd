import React, { RefObject, useEffect, useState } from 'react';
import Bio from '@components/profile/old-stuff/common/components/Bio';
import arrowdwn from '@assets/arrow-down.svg';
import arrowup from '@assets/arrow-up.svg';
import userDisplay, { fetchUserAndSetStore } from '@store/user/user-display';
import { useStore } from '@nanostores/react';
import Name from '@components/profile/old-stuff/common/components/Name';
import ButtonsEdit from '@components/profile/old-stuff/common/components/ButtonsEdit';
import Label from '@components/profile/old-stuff/common/components/Label';
import Quote from '@components/profile/old-stuff/common/components/Quote';
import Follow from '@components/profile/old-stuff/common/components/Follow';
import WebsiteUrl from '@components/profile/old-stuff/common/components/WebsiteUrl';
import Statistics from '@components/profile/old-stuff/common/components/Statistics';
import ButtonsFollow from '@components/profile/old-stuff/common/components/ButtonsFollow';
import loggedUser from '@store/user/logged-user';
import {
  postBioData,
  postNameData,
  postQuoteData,
  postWebsiteUrlData,
} from '@src/api-wrapper/user/user';

type asyncCb = () => Promise<void>;
const ProfileDisplay = ({ id }: { id: string }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick((prev) => !prev);
  };

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
      <img
        draggable='false'
        src={setProfileUrl()}
        alt='avatar'
        className='rounded-full flex w-6/12 '
      />
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
      <Label label='label not available' />
      {loggedUser.get().userId === userDisplay.get().userId ? (
        <ButtonsEdit
          edit={edit}
          onEdit={() => {
            setEdit(true);
          }}
          onSave={() => {
            // calls all the callbacks and waits for all of them
            Promise.all(asyncCallbackList.map(async (cb) => cb())).then(() => {
              setRequestAgain((prev) => !prev);
            });
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
      <Follow
        followerCount={userData.followerCount}
        followingCount={userData.followingCount}
      />

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

      {click ? (
        <div className='text-center items-center w-full'>
          <button
            type='button'
            className='flex mx-auto text-[16px] justify-center font-roboto-text text-secondary items-center text-center mt-4'
            onClick={handleClick}
            onKeyDown={handleClick}
          >
            <h3 className='inline-block text-center'>See less</h3>
            <img
              draggable='false'
              src={arrowup}
              alt='arrowupicon'
              className='inline-block ml-4 w-4'
            />
          </button>
          <div className='flex flex-col justify-center items-center'>
            <Statistics roadmapsCount={userData.roadmapsCount} />
            <div className='w-5/6'>
              <Bio
                originalValue={userData.bio}
                edit={edit}
                saveRequest={(valueRef: RefObject<string>) => {
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
      ) : (
        <button
          type='button'
          className='flex text-[16px] font-roboto-text text-secondary items-center text-center mt-4'
          onClick={handleClick}
          onKeyDown={handleClick}
        >
          <h3 className='inline-block'>See more</h3>
          <img
            draggable='false'
            src={arrowdwn}
            alt='arrowdownicon'
            className='inline-block ml-4 w-4'
          />
        </button>
      )}
    </>
  );
};

export default ProfileDisplay;
