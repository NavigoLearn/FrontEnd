import React, { useState } from 'react';
import discord from '@assets/discord.svg';
import github from '@assets/github.svg';
import gmail from '@assets/gmail.svg';
import IssuesList from '@components/feedback/IssuesList';
import Issue from '@components/roadmap/to-be-organized/utils/Issue';

const DesktopFeedback = () => {
  const [formType, setFormType] = useState(undefined);
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [bugTitle, setBugTitle] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [otherTitle, setOtherTitle] = useState('');
  const [otherDescription, setOtherDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === 'featureRequest') {
      setFeatureTitle('');
      setFeatureDescription('');
    }
    if (formType === 'bugReport') {
      setBugTitle('');
      setBugDescription('');
    }
    if (formType === 'somethingElse') {
      setOtherTitle('');
      setOtherDescription('');
    }
  };

  const renderForm = () => {
    if (formType === 'featureRequest') {
      return (
        <form
          className='flex flex-col gap-5 items-center justify-center mt-14'
          onSubmit={handleSubmit}
        >
          <textarea
            required
            value={featureTitle}
            onChange={({ target }) => setFeatureTitle(target.value)}
            placeholder='Give a descriptive title for your feature:'
            className='flex w-10/12 justify-cente rounded-lg text-lg border-0 shadow-sm'
          />
          <textarea
            required
            value={featureDescription}
            onChange={({ target }) => setFeatureDescription(target.value)}
            placeholder='Description of the feature:'
            className='flex justify-center w-10/12 h-40 text-start font-roboto-text rounded-lg text-lg text-black border-0 shadow-sm'
          />
          <button
            type='submit'
            className='bg-primary px-12 py-2 text-white rounded-full font-roboto-text font-medium mt-4 '
          >
            Send
          </button>
        </form>
      );
    }
    if (formType === 'bugReport') {
      return (
        <form
          className='flex flex-col gap-5 items-center justify-center mt-14'
          onSubmit={handleSubmit}
        >
          <textarea
            required
            value={bugTitle}
            onChange={({ target }) => setBugTitle(target.value)}
            placeholder='Give a descriptive title for the bug experienced:'
            className='flex w-10/12 justify-cente rounded-lg text-lg border-0 shadow-sm'
          />
          <textarea
            required
            value={bugDescription}
            onChange={({ target }) => setBugDescription(target.value)}
            placeholder='Steps to reproduce:'
            className='flex justify-center w-10/12 h-40 text-start font-roboto-text rounded-lg text-lg text-black border-0 shadow-sm'
          />
          <button
            type='submit'
            className='bg-primary px-12 py-2 text-white rounded-full font-roboto-text font-medium mt-4'
          >
            Send
          </button>
        </form>
      );
    }
    if (formType === 'somethingElse') {
      return (
        <form
          className='flex flex-col gap-5 items-center justify-center mt-14'
          onSubmit={handleSubmit}
        >
          <textarea
            required
            value={otherTitle}
            onChange={({ target }) => setOtherTitle(target.value)}
            placeholder='Tell us whatever you would like:'
            className='flex w-10/12 justify-cente rounded-lg text-lg border-0 shadow-sm'
          />
          <textarea
            required
            value={otherDescription}
            onChange={({ target }) => setOtherDescription(target.value)}
            placeholder='As many details as possible:'
            className='flex justify-center w-10/12 h-40 text-start font-roboto-text rounded-lg text-lg text-black border-0 shadow-sm'
          />
          <button
            type='submit'
            className='bg-primary px-12 py-2 text-white rounded-full font-roboto-text font-medium mt-4'
          >
            Send
          </button>
        </form>
      );
    }
    return null;
  };

  return (
    <div>
      <h1 className='text-2xl font-kanit-text font-semibold justify-center mt-10 text-center text-thirdary'>
        Our roadmap
      </h1>
      <div className='text-center justify-center flex mt-4'>
        <h2 className='text-xl text-center w-10/12 text-secondary font-normal font-kanit-text'>
          Above everything, we value your feedback and where you want this
          website to go. We make all our code open source and you can also leave
          suggestions there
        </h2>
      </div>
      <div className='flex flex-col-3 gap-3 justify-center mt-10'>
        <button
          type='button'
          className='font-roboto text-sm font-normal text-center hover:underline hover:underline-offset-2'
          onClick={() => setFormType('featureRequest')}
        >
          Feature request
        </button>
        <button
          type='button'
          className='font-roboto font-normal text-sm py-2 px-6 text-center text-white bg-primary rounded-xl hover:underline hover:underline-offset-2'
          onClick={() => setFormType('bugReport')}
        >
          Report a bug
        </button>
        <button
          type='button'
          className='font-roboto font-normal text-sm text-center hover:underline hover:underline-offset-2'
          onClick={() => setFormType('somethingElse')}
        >
          Someting else
        </button>
      </div>
      {renderForm()}
      <h1 className='text-center mt-20 text-3xl font-kanit-text font-semibold'>
        Planned features
      </h1>
      <div className='justify-center text-center mt-10'>
        <IssuesList />
      </div>
      <a
        href='https://github.com/orgs/NavigoLearn/discussions'
        aria-label='Link to github discussion'
        target='__blank'
        rel='noreferrer'
        className='mt-10 flex justify-center text-center mx-auto text-xl font-roboto-text font-medium bg-black rounded-2xl py-2 px-6 text-white w-fit hover:underline hover:underline-offset-2'
      >
        See all discussion
      </a>
      <div className='mt-10 flex flex-col'>
        <h1 className='text-center text-xl font-kanit-text font-medium text-eugene'>
          Connect with us through our
        </h1>
        <div className='mt-5 mx-2 flex flex-col-3 gap-5 justify-center text-center items-center'>
          {/* disabled eslint for this anchor because WE DONT HAVE A SERVER !!!!!!!! */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            // insert discord server link here
            href=''
            className='w-48 text-placeholder font-kanit-text translate-y-12'
          >
            discord
            <img
              draggable='false'
              src={discord.src}
              alt='discord'
              className='w-full mt-2'
            />
          </a>
          <a
            href='https://github.com/NavigoLearn'
            target='_blank'
            rel='noreferrer'
            className='w-48 text-placeholder font-kanit-text'
          >
            github organization
            <img
              draggable='false'
              src={github.src}
              alt='github'
              className='mt-2'
            />
          </a>
          <a
            href='mailto:navigolearn@gmail.com'
            className='w-48 text-placeholder font-kanit-text translate-y-12'
          >
            email
            <img
              draggable='false'
              src={gmail.src}
              alt='gmail'
              className='flex'
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DesktopFeedback;
