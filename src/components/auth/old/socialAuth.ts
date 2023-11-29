import { dispatchAnalyticsEvent } from '@src/to-be-organized/analytics-module/stores/analytics';
import {identifyUser} from "@src/to-be-organized/analytics-module/events/events-mapper.ts";

function handleSocialLogin(link: string, features: string) {
  // open /api/auth/google-login in a new window and store the window reference
  const popup = window.open(link, '_blank', features);

  // poll the child window's location every 500ms
  const intervalId = setInterval(() => {
    try {
      // check if cookie is set
      if (!document.cookie.includes('token')) return;

      // do something after successful login

      // stop polling
      clearInterval(intervalId);

      // redirect to home page
      window.location.reload();
    } catch (e) {
      // do nothing
    }
  }, 100);

  // if the child window is closed, stop polling
  popup.onclose = () => {
    clearInterval(intervalId);
  };

  // if parent window is closed, close the child window
  window.onunload = () => {
    popup.close();
  };
}

export function handleGoogleLogin() {
  // get the current monitor size
  const { width, height } = window.screen;

  const top = height / 2 - 350;
  const left = width / 2 - 250;

  const features = `popup=1,width=500,height=700,left=${left},top=${top}`;

  // open /api-wrapper/auth/google-login in a new window and store the window reference
  handleSocialLogin('/api/auth/google-login', features);
  dispatchAnalyticsEvent('authInteraction', {
    actionType: 'google-auth',
  });
  identifyUser();
}

export function handleGitHubLogin() {
  // get the current monitor size
  const { width, height } = window.screen;

  const top = height / 2 - 350;
  const left = width / 2 - 250;

  const features = `popup=1,width=500,height=700,left=${left},top=${top}`;

  handleSocialLogin('/api/auth/github-login', features);
  dispatchAnalyticsEvent('authInteraction', {
    actionType: 'github-auth',
  });
}

export async function handleLogout() {
  // makes call to api for logout
  await fetch('/api/auth/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // reload page
  dispatchAnalyticsEvent('authInteraction', {
    actionType: 'logout',
  });
  setTimeout(() => {
    window.location.reload();
  }, 0);
}
