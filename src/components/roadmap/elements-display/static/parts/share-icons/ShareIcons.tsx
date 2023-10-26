import React, { useEffect, useState } from 'react';
import RedditIcon from '@components/roadmap/elements-display/static/parts/share-icons/RedditIcon.tsx';
import TwitterIcon from '@components/roadmap/elements-display/static/parts/share-icons/TwitterIcon.tsx';
import FacebookIcon from '@components/roadmap/elements-display/static/parts/share-icons/FacebookIcon.tsx';
import storeRoadmapAbout, {
  getRoadmapAbout,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import { useStore } from '@nanostores/react';

function buildRedditLink() {
  const roadmapTitle = getRoadmapAbout().name;
  const roadmapLink = window.location.href;
  return `https://www.reddit.com/submit?title=${`${roadmapTitle} Roadmap`}&url=${roadmapLink}`;
}

function buildTwitterLink() {
  const roadmapTitle = getRoadmapAbout().name;
  const roadmapLink = window.location.href;

  return `https://twitter.com/intent/tweet?text=${`${roadmapTitle} Roadmap`}&url=${roadmapLink}`;
}

function buildFacebookLink() {
  const roadmapTitle = getRoadmapAbout().name;
  const roadmapLink = window.location.href;

  return `https://www.facebook.com/sharer/sharer.php?u=${roadmapLink}&quote=${roadmapTitle}`;
}

const ShareIcons = () => {
  useStore(storeRoadmapAbout);
  const [redditLink, setRedditLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');

  useEffect(() => {
    setRedditLink(buildRedditLink());
    setTwitterLink(buildTwitterLink());
    setFacebookLink(buildFacebookLink());
  });

  return (
    <div className='absolute right-1 top-1'>
      <div className='flex flex-col justify-center items-center gap-1'>
        <span className='text-placeholder text-sm '>Share</span>
        <a
          href={redditLink}
          target='_blank'
          rel='noreferrer'
          className='pointer-events-auto'
        >
          <RedditIcon size={26} />
        </a>
        <a
          href={twitterLink}
          target='_blank'
          rel='noreferrer'
          className='pointer-events-auto'
        >
          <TwitterIcon size={26} />
        </a>
        <a
          href={facebookLink}
          target='_blank'
          rel='noreferrer'
          className='pointer-events-auto'
        >
          <FacebookIcon size={26} />
        </a>
      </div>
    </div>
  );
};

export default ShareIcons;
