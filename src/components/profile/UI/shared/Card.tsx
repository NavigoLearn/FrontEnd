import React, { useEffect, useState } from 'react';
import UpvoteDownvote from '@components/explore/UI/shared/cards/components/UpvoteDownvote';
import { motion, AnimatePresence } from 'framer-motion';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';

type ICardProps = {
  roadmapId: string;
};

async function getRoadmapMiniData(roadmapId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isDraft: true,

        title: 'AI and data science in computer',
        description:
          'A roadmap explaining the basics of the react framework. I hope you will enjoy it !!!! Step by step guide to becoming a modern backend developer in 2023',
        upvotes: 53,
        upvoteState: 'upvoted',
        miniCreatorData: {
          name: 'John Doe',
          profilePictureUrl:
            'https://media.istockphoto.com/id/470100848/ro/vector/pictograma-profilului-masculin-alb%C4%83-pe-fundal-albastru.jpg?s=612x612&w=0&k=20&c=-We-8zY-Oj7MMSuKwpOEkm7QUX8Gnc4Bk0KcBIO8lYY=',
          id: '1',
        },
      });
    }, 250);
  });
}

// Usage
const Card = ({ roadmapId }: ICardProps) => {
  const [upvotes, setUpvotes] = useState(0);

  const [loaded, setLoaded] = useState(false);
  const [roadmapMiniData, setRoadmapMiniData] = useState(null);

  useEffect(() => {
    getRoadmapMiniData(roadmapId).then((data) => {
      // console.log(data, ' retunr ed data');
      setRoadmapMiniData(data);
      setLoaded(true);
      // @ts-ignore
      setUpvotes(data.upvotes);
    });
  }, []);

  if (!loaded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{ opacity: 0 }}
        className='w-80 h-48 border-2 border-black border-opacity-10 rounded-md relative px-4'
      >
        <AnimatePresence>
          <motion.div
            initial={{ width: '0%' }}
            animate={{
              width: '100%',
              transition: {
                repeat: Infinity,
                repeatDelay: 1,
                duration: 1.5,
                delay: 0.2,
              },
            }}
            className='h-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded mt-4'
          />
          <motion.h2
            initial={{ x: -30, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                repeat: Infinity,
                repeatDelay: 1,
                duration: 1.5,
                delay: 0.4,
              },
            }}
            className='h-7 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 rounded mt-5'
          />
          <motion.button
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                repeat: Infinity,
                repeatDelay: 1,
                duration: 1.5,
                delay: 0.6,
              },
            }}
            className='w-1/2 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded mt-2'
          />
          <motion.div
            initial={{ width: '0%' }}
            animate={{
              width: '100%',
              transition: {
                repeat: Infinity,
                repeatDelay: 1,
                duration: 1.5,
                delay: 0.8,
              },
            }}
            className='h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded mt-6'
          />
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <div
      className={`w-80 h-48 border-2 border-black hover:border-primary hover:border-opacity-30 border-opacity-10 rounded-md relative${tailwindTransitionClass}`}
      style={{
        boxShadow: '0 4px 6px 0 rgba(0, 0, 255, 0.1)',
      }}
    >
      <section className='flex mt-3 items-center justify-between px-4'>
        <h1 className='text-lg font-roboto-text font-medium'>
          {/* {roadmapMiniData.title} */}
          Some random long
        </h1>
        <button
          type='button'
          onClick={() => {
            console.log('clicked and went to profile');
          }}
          className=' flex gap-2 items-center'
        >
          <img
            alt='profilePicture'
            className='w-6 h-6 rounded-full'
            src={roadmapMiniData.miniCreatorData.profilePictureUrl}
          />
        </button>
      </section>
      <span className='absolute top-14 w-full text-xs  pl-4 pr-2 text-secondary font-roboto-text'>
        {roadmapMiniData.description}
      </span>

      <div className='absolute bottom-2 flex justify-end px-4 w-full pr-3'>
        {!roadmapMiniData.isDraft && (
          <UpvoteDownvote
            upvotes={upvotes}
            voteState={roadmapMiniData.voteState}
          />
        )}

        {roadmapMiniData.isDraft && (
          <button
            type='button'
            onClick={() => {
              console.log('clicked and learnin stuff');
            }}
            className={`font-roboto-text text-primary px-3 py-1 rounded-sm text-sm font-medium bg-transparent hover:bg-primary hover:text-white ${tailwindTransitionClass}`}
          >
            Publish
          </button>
        )}
        <button
          type='button'
          onClick={() => {
            console.log('clicked and learnin stuff');
          }}
          className={`font-roboto-text text-primary px-3 py-1 rounded-sm text-sm font-medium bg-transparent hover:bg-primary hover:text-white ${tailwindTransitionClass}`}
        >
          {roadmapMiniData.isDraft ? 'Edit' : 'Learn'}
        </button>
      </div>
    </div>
  );
};

export default Card;
