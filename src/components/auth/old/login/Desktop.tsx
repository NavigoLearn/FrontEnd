import React, { useEffect, useState } from 'react';
import GoogleLoginButton from '@components/auth/old/social-buttons/GoogleLoginButton';
import GithubLoginButton from '@components/auth/old/social-buttons/GithubLoginButton';
import {
  handleGitHubLogin,
  handleGoogleLogin,
} from '@components/auth/old/socialAuth';
import { handleLocalLogin } from '../../../../api-wrapper/user/routes-user';

const DesktopLogin = () => {
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
    <div className='mt-28'>
      <h1 className='text-6xl font-kanit-text text-center'>Welcome back!</h1>
      <div className='text-base mt-3 font-light flex items-center justify-center font-roboto-text'>
        <span className='pr-1 text-secondary'>
          You don&apos;t have an account?
        </span>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href='/signup' className='text-primary'>
          Create one here.
        </a>
      </div>
      <form className='mt-12' onSubmit={handleSubmit}>
        <h2 className='text-4xl font-kanit-text text-center'>
          Right now, we only accept external logins on the site.
        </h2>
        <h2 className='text-4xl font-kanit-text text-center'>
          We hope that you can understand!
        </h2>
        <div className='gap-2.5 mt-12 w-full flex flex-col justify-center items-center'>
          <GithubLoginButton onClick={handleGitHubLogin} />
          <GoogleLoginButton onClick={handleGoogleLogin} />
        </div>
      </form>
    </div>
  );
};

export default DesktopLogin;
