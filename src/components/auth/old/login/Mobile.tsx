import React, { useEffect, useState } from 'react';
import GoogleLoginButton from '@components/auth/old/social-buttons/GoogleLoginButton';
import GithubLoginButton from '@components/auth/old/social-buttons/GithubLoginButton';
import {
  handleGoogleLogin,
  handleGitHubLogin,
} from '@components/auth/old/socialAuth';
import { handleLocalLogin } from '../../../../api-wrapper/user/routes-user';

const MobileLogin = () => {
  useEffect(() => {
    if (document.cookie.includes('token')) {
      // redirect to home page
      window.location.href = '/home';
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLocalLogin(email, password).then((res) => {
      if (res.status === 200) {
        window.location.href = '/explore';
      } else {
        alert('Invalid email or password');
      }
    });

    setEmail('');
    setPassword('');
  };

  return (
    <div className='mt-12 min-h-full'>
      <h1 className='text-5xl font-kanit-text text-center sm:text-6xl'>
        Welcome back!
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
        </div>
        <div className='flex justify-center items-center mt-5'>
          <button
            type='submit'
            className='rounded-full w-6/12 py-2.5 bg-buttongradient text-white font-kanit-text text-lg select-none'
          >
            Login
          </button>
        </div>
        <div className='mt-6 grid grid-cols-3 items-center text-placeholder mx-8'>
          <hr className='border-gray-300' />
          <p className='text-center text-xs sm:text-core font-roboto-text select-none'>
            OR
          </p>
          <hr className='border-gray-300' />
        </div> */}
        <div className='grid gap-2.5 mt-6 items-center justify-center'>
          <GoogleLoginButton onClick={handleGoogleLogin} />
          <GithubLoginButton onClick={handleGitHubLogin} />
        </div>
      </form>
    </div>
  );
};
export default MobileLogin;
