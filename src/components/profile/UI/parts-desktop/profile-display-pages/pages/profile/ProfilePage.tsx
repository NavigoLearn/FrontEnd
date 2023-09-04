import React, { useEffect, useState } from 'react';
import ProfilePicture from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/ProfilePicture';
import InputComponent from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/InputComponent';
import TextComponent from '@components/roadmap/pages-roadmap/editor/editor-pages/components-page/components/TextComponent';
import TextareaComponent from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/TextareaComponent';

type IProfileData = {
  name: string;
  github: string;
  email: string;
  website: string;
  bio: string;
  pictureUrl: string;
};
async function getProfileData(): Promise<IProfileData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Erupturatis',
        github: 'github.com/erupturatis',
        email: 'Barbulescu.eugeno@gmail.com',
        website: 'erupturatis.com',
        bio: 'I am a full stack developer with a passion for learning and teaching. I am currently working on a project called Roadmap Planner.',
        pictureUrl:
          'https://media.istockphoto.com/id/470100848/ro/vector/pictograma-profilului-masculin-alb%C4%83-pe-fundal-albastru.jpg?s=612x612&w=0&k=20&c=-We-8zY-Oj7MMSuKwpOEkm7QUX8Gnc4Bk0KcBIO8lYY=',
      });
    }, 150);
  });
}
const ProfilePage = () => {
  const [profileData, setProfileData] = useState<IProfileData>(null);

  const inputFields = [
    {
      name: 'Name',
      value: profileData?.name,
      editable: true,
    },
    {
      name: 'Github',
      value: profileData?.github,
      editable: true,
    },
    {
      name: 'Email',
      value: profileData?.email,
      editable: false,
    },
    {
      name: 'Website',
      value: profileData?.website,
      editable: true,
    },
  ];

  const textareaFields = [
    {
      name: 'Bio',
      value: profileData?.bio,
      editable: true,
    },
  ];

  useEffect(() => {
    getProfileData().then((data) => {
      setProfileData(data);
    });
  }, []);

  if (!profileData) return null;

  return (
    <div className='ml-14 mt-6'>
      <h1 className='text-4xl monitor:text-5xl text-darkBlue font-roboto-text font-medium'>
        Profile
      </h1>
      <h6 className='text-lg monitor:text-xl font-roboto-text text-placeholder'>
        Update your profile details below
      </h6>

      <div className='mt-7'>
        <ProfilePicture src={profileData.pictureUrl} />
      </div>
      <section className='flex flex-col gap-8 mt-16'>
        {inputFields.map((field) => {
          return (
            <InputComponent
              key={field.name}
              value={field.value}
              callback={() => {
                console.log('callback in store');
              }}
              editable={field.editable}
              label={field.name}
            />
          );
        })}
      </section>

      <section className='flex flex-col gap-8 mt-10'>
        {textareaFields.map((field) => {
          return (
            <TextareaComponent
              key={field.name}
              value={field.value}
              callback={() => {
                console.log('callback in store');
              }}
              editable={field.editable}
              label={field.name}
            />
          );
        })}
      </section>
    </div>
  );
};

export default ProfilePage;
