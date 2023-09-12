import React, { useState } from 'react';
import GoogleLoginButton from '@components/auth/old/social-buttons/GoogleLoginButton';
import GithubLoginButton from '@components/auth/old/social-buttons/GithubLoginButton';
import {
  handleGoogleLogin,
  handleGitHubLogin,
} from '@components/auth/old/socialAuth';
import { postSignUpData } from '../../../../api-wrapper/user/routes-user';

// Aici trebuie rescrise testele pentru ca name field a fost sters din register
const MobileSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reapeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (password !== reapeatPassword) {
      alert('The passwords do not match!');
      setPassword('');
      setRepeatPassword('');
      return;
    }
    e.preventDefault();
    postSignUpData(email, password).then((res) => {
      if (res.status === 201) {
        window.location.href = '/explore';
      }
    });
    setRepeatPassword('');
    setPassword('');
    setEmail('');
  };

  return (
    <div className='mt-12 min-h-full'>
      <h1 className='text-4xl font-kanit-text text-center sm:text-5xl'>
        Ya gave in too, right?
      </h1>
      <form className='mt-12' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-kanit-text text-center mx-2'>
          Right now, we only accept external logins on the site.
        </h2>
        <h2 className='text-2xl font-kanit-text text-center mx-2'>
          We hope that you can understand!
        </h2>
        {/* <div className='flex flex-col'>
          <div className='flex justify-center items-center'>
            <input
              required
              type='text'
              placeholder='Email'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              className='rounded-xl w-11/12 sm:w-10/12 pl-3 placeholder:font-kanit-text placeholder:text-placeholder h-11 border-1 shadow-sm select-none'
            />
          </div>
          <div className='flex justify-center items-center'>
            <input
              required
              type='password'
              placeholder='Password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className='rounded-xl w-11/12 sm:w-10/12 pl-3 placeholder:font-kanit-text placeholder:text-placeholder h-11 border-1 shadow-sm mt-3 select-none'
            />
          </div>
          <div className='flex justify-center items-center'>
            <input
              required
              type='password'
              placeholder='Confirm password'
              value={reapeatPassword}
              onChange={({ target }) => setRepeatPassword(target.value)}
              className='rounded-xl w-11/12 sm:w-10/12 pl-3 placeholder:font-kanit-text placeholder:text-placeholder h-11 border-1 shadow-sm mt-3 select-none'
            />
          </div>
        </div>
        <div className='flex justify-center items-center mt-5'>
          <button
            type='submit'
            className='rounded-full w-8/12 sm:w-6/12 py-2.5 bg-buttongradient text-white font-kanit-text text-lg select-none'
          >
            Sign up
          </button>
        </div>
        <div className='mt-6 grid grid-cols-3 items-center text-placeholder mx-8 select-none'>
          <hr className='border-gray-300' />
          <p className='text-center text-xs sm:text-core font-roboto-text'>
            OR
          </p>
          <hr className='border-gray-300' />
        </div> */}
        <div className='grid gap-2.5 mt-6 items-center justify-center'>
          <GithubLoginButton onClick={handleGitHubLogin} />
          <GoogleLoginButton onClick={handleGoogleLogin} />
        </div>
      </form>
    </div>
  );
};

export default MobileSignUp;
