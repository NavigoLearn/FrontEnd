import explore from '@assets/explore.svg';
import feedback from '@assets/feedback.svg';
import home from '@assets/home.svg';
import profile from '@assets/profile.svg';
import circle from '@assets/circle.svg';
import write from '@assets/write.svg';

const loggedLinks = [
  // {
  //   title: 'Profile',
  //   path: '/profile',
  //   cName:
  //     ' text-sm hover:underline flex items-center text-center font-normal hover:underline-offset-4',
  //   cIcon: profile,
  //   id: 1,
  // },
  {
    title: 'Create Roadmap',
    path: '/roadmap/create',
    cName:
      ' text-md font-semibold px-6 drop-shadow-xl rounded-md py-1 bg-primary border-2 border-transparent hover:border-black hover:bg-darkBlue transition-all text-white flex items-center text-center font-normal ',

    cIcon: '',
    id: 3,
    hasUnder: false,
  },
];

const guestLinks = [
  {
    title: 'Get Started',
    path: '/signup',
    cName:
      'text-md font-medium font-roboto-text text-center inline-block px-8 py-1 rounded-md drop-shadow-xl border-2 border-black hover:bg-darkBlue hover:text-white transition-all',
    id: 2,
    cIcon: '',
    hasUnder: false,
  },
  {
    title: 'Try Tool',
    path: '/roadmap/create',
    cName:
      ' text-md font-semibold px-8 drop-shadow-xl rounded-md py-1 bg-primary border-2 border-transparent hover:border-black hover:bg-darkBlue transition-all text-white flex items-center text-center font-normal ',
    cIcon: '',
    id: 3,
    hasUnder: false,
  },
];

const mobileLogged = [
  {
    title: 'Home',
    path: '/',
    cName:
      'flex items-center text-center text-xl py-8 m-auto hover:underline w-10/12 h-12 justify-center font-normal -translate-x-1',
    cIcon: home,
    id: 1,
  },
  {
    title: 'Explore',
    path: '/explore',
    cName:
      'flex items-center text-center text-xl py-8 m-auto hover:underline w-10/12 h-12 justify-center font-medium -translate-x-1',
    cIcon: explore,
    id: 2,
  },
  {
    title: 'Feedback',
    path: '/feedback',
    cName:
      'flex items-center text-center text-xl py-8 m-auto hover:underline w-10/12 h-12 justify-center font-normal -translate-x-1',
    cIcon: feedback,
    id: 3,
  },
  {
    title: 'Profile',
    path: '/profile',
    cName:
      'flex items-center text-center text-xl py-8 m-auto hover:underline w-10/12 h-12 justify-center font-normal -translate-x-1',
    cIcon: profile,
    id: 4,
  },
  {
    title: 'Logout',
    path: 'logout',
    id: 5,
  },
  {
    title: 'Create roadmap',
    path: '/roadmap/create',
    cName:
      'flex items-center text-center text-xl py-8 m-auto  w-full h-8 justify-center font-normal bg-primary text-white ',
    cIcon: '',
    id: 6,
  },
];

const mobileGuest = [
  {
    title: 'Home',
    path: '/home',
    cName:
      'flex items-center text-center text-xl py-8 m-auto hover:underline w-10/12 h-12 justify-center -translate-x-1',
    cIcon: home,
    id: 1,
  },
  {
    title: 'Explore',
    path: '/explore',
    cName:
      'flex items-center text-center text-xl py-8 m-auto hover:underline w-10/12 h-12 justify-center font-medium -translate-x-1',
    cIcon: explore,
    id: 2,
  },
  {
    title: 'Feedback',
    path: '/feedback',
    cName:
      'flex items-center text-center text-xl py-8 m-auto hover:underline w-10/12 h-12 justify-center -translate-x-1',
    cIcon: feedback,
    id: 3,
  },
  {
    title: 'Login',
    path: '/login',
    cName:
      'flex items-center text-center text-xl py-8 mx-auto hover:underline w-10/12 h-12 justify-center -translate-x-2',
    cIcon: profile,
    id: 4,
  },
  {
    title: 'Try Tool',
    path: '/roadmap/create',
    cName:
      'flex items-center text-center text-xl py-8 mx-auto hover:underline w-10/12 h-12 justify-center -translate-x-2 mb-2',
    cIcon: write,
    id: 5,
  },
  {
    title: 'Get Started',
    path: '/signup',
    cName:
      'flex items-center text-center text-xl m-auto hover:underline bg-primary text-background rounded-full px-4 py-8 justify-center h-12 rounded-xl w-56 h-14',
    id: 6,
  },
];

export { loggedLinks, guestLinks, mobileLogged, mobileGuest };
