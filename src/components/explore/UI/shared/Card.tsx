import React, { useEffect, useState } from 'react';

type ICardProps = {
  roadmapId: string;
};

async function getRoadmapMiniData(roadmapId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
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
    }, 10);
  });
}

// Usage
getRoadmapMiniData('someId').then((data) => {
  console.log(data);
});
const Card = ({ roadmapId }: ICardProps) => {
  const [upvotes, setUpvotes] = useState(0);
  const [upvoted, setUpvoted] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [roadmapMiniData, setRoadmapMiniData] = useState(null);

  useEffect(() => {
    getRoadmapMiniData(roadmapId).then((data) => {
      console.log(data, ' retunr ed data');
      setRoadmapMiniData(data);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className='w-[520px] h-[250px] border-2 border-black border-opacity-10 rounded-md relative  '
      style={{
        boxShadow: '0 4px 6px 0 rgba(0, 0, 255, 0.1)',
      }}
    >
      <section className='flex mt-3 items-center justify-between px-4'>
        <h1 className='text-2xl font-roboto-text font-medium'>
          {roadmapMiniData.title}
        </h1>
        <div className=' flex gap-2 items-center'>
          <div className='text-placeholder font-roboto-text'>Made by</div>
          <img
            className='w-6 h-6 rounded-full'
            src={roadmapMiniData.miniCreatorData.profilePictureUrl}
          />
        </div>
      </section>
      <span className='absolute top-16 w-full  pl-4 pr-2 text-secondary font-roboto-text'>
        {roadmapMiniData.description}
      </span>

      <div className='absolute bottom-2 flex justify-between px-2'>
        <div>
          <button>
            <img />
          </button>
          <div>{roadmapMiniData.upvotes}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
