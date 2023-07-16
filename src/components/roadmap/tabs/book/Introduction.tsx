import React from 'react';
import MainTitle from '@components/roadmap/tabs/book/parts/MainTitle';
import TLDR from '@components/roadmap/tabs/book/parts/TLDR';
import Text from '@components/roadmap/tabs/book/parts/Text';
import ChapterTitle from '@components/roadmap/tabs/book/parts/ChapterTitle';

const chapters = [
  {
    title: 'What is a roadmap?',
    text: 'A roadmap is supposed to be a way to structure information at a high level and offer an overview of a field that you want to learn as a whole and all the possibilities you have in that field. A roadmap uses node ( that can be of multiple types ) and pages to hold information. They are highly customizable and are an effective tool for learning and helping others to learn',
    TLDR: 'A page with nodes you can elements-editing to organize information better',
  },
  {
    title: 'Generalities',
    text: 'You start only with a root that is quite restricted and is meant to be the starting point for the roadmap. Currently you can only elements-editing a roadmap as the owner of the roadmap but we plan co-ownership and many more features for collaboration on roadmaps. But as for now the generalities you need to know',
    TLDR: 'You start with a node and only the owner can elements-editing a roadmap ( but we plan to change that)',
  },
];

const Introduction = () => {
  return (
    <div className='w-full'>
      <MainTitle text='Introduction' />
      {chapters.map((chapter) => {
        return (
          <div key={chapter.title} className='mb-20'>
            <ChapterTitle text={chapter.title} />
            <Text text={chapter.text} />
            <TLDR text={chapter.TLDR} />
          </div>
        );
      })}
    </div>
  );
};

export default Introduction;
