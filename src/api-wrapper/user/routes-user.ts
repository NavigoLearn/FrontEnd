import { type UserResponse } from '@type/user/types';
import { errorHandlerDecorator } from '@src/typescript/error-handler';

export const fetchUserData = errorHandlerDecorator(
  async (id: string): Promise<{ data: UserResponse; status: number }> => {
    let status: number;
    const response = await fetch(`/api/users/${id}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      status = res.status;
      return res.json();
    });
    return response;
  }
);

export const handleLocalLogin = errorHandlerDecorator(
  async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res);
    return response;
  }
);

export const postSignUpData = errorHandlerDecorator(
  async (email: string, password: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res);
    return response;
  }
);

export const postBioData = errorHandlerDecorator(async (bio: string) => {
  const response = await fetch('/api/users/bio', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      bio,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  return response;
});

export const postNameData = errorHandlerDecorator(async (name: string) => {
  const response = await fetch('/api/users/name', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      name,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  return response;
});

export const postQuoteData = errorHandlerDecorator(async (quote: string) => {
  const response = await fetch('/api/users/quote', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      quote,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  return response;
});

export const postWebsiteUrlData = errorHandlerDecorator(
  async (websiteUrl: string) => {
    const response = await fetch('/api/users/website-url', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        websiteUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res);
  }
);

export const fetchGetMiniProfileData = async () => {
  try {
    const response = await fetch(`/api/users/mini`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res);
    if (!response.ok) throw new Error('User not found');
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    return e.toString() === 'Error: User not found' ? false : 'Error';
  }
};

export const fetchGetMiniProfileDataById = errorHandlerDecorator(
  async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/mini`, {
        method: 'GET',
        credentials: 'include',
      }).then((res) => res);
      if (!response.ok) throw new Error('User not found');
      return response.json();
    } catch (e) {
      return false;
    }
  }
);

export const fetchGetUserIsFollowing = errorHandlerDecorator(
  async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/is-following`, {
        method: 'GET',
        credentials: 'include',
      }).then((res) => res);
      const responseData = await response.json();
      return responseData;
    } catch (e) {
      return false;
    }
  }
);

export const fetchFollowUser = errorHandlerDecorator(async (userId: string) => {
  try {
    const response = await fetch(`/api/users/${userId}/follow`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res);
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    return false;
  }
});

export const fetchUnfollowUser = errorHandlerDecorator(
  async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/follow`, {
        method: 'DELETE',
        credentials: 'include',
      }).then((res) => res);
      const responseData = await response.json();
      return responseData;
    } catch (e) {
      return false;
    }
  }
);
