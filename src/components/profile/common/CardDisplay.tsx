import React, { useEffect, useState } from 'react';
import Card from '@components/explore/Card';
import { useStore } from '@nanostores/react';
import cardsFromApi, {
  setRoadmapCardsFromApiProfile,
} from '@store/explore/card_store_explore';
import userDisplay from '@store/user/user-display';

const CardDisplay = () => {
  const { userId, name } = useStore(userDisplay);
  const [render, setRender] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { cards, ids } = useStore(cardsFromApi);

  useEffect(() => {
    if (userId === '' || !userId) {
      return;
    }

    setRoadmapCardsFromApiProfile(userId, name).then(() => {
      setRender((prev) => !prev);
      setLoaded(true);
    });
  }, [userId]);

  return (
    <>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-11 xl:grid-cols-3 w-full'>
        {loaded &&
          ids.map((card: string) => (
            <div key={card} className='flex items-center justify-center w-full'>
              <Card cardStore={cards[card]} />
            </div>
          ))}
      </ul>

      {loaded && ids.length === 0 && (
        <div className='absolute text-2xl font-semibold w-full flex justify-center items-center mt-10'>
          This user has no roadmaps created yet
        </div>
      )}
    </>
  );
};

export default CardDisplay;
