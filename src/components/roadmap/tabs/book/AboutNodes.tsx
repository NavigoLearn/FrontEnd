import React from 'react';
import MainTitle from '@components/roadmap/tabs/book/parts/MainTitle';
import ChapterTitle from '@components/roadmap/tabs/book/parts/ChapterTitle';
import Text from '@components/roadmap/tabs/book/parts/Text';
import TLDR from '@components/roadmap/tabs/book/parts/TLDR';

const chapters = [
  {
    title: 'Info',
    text: 'The info node can be converted in a resource nodes. Has a tab-attachment associated to it and a title. It is the backbone of the roadmap being the only node that can make up the main path. Used either for small amount of information or to give some overview of a chapter. Can be used in groups to describe a broader amount of information',
    TLDR: 'Basic node, used for anything',
  },
  {
    title: 'Resource',
    text: 'Can be converted to info node. It is always a secondary node. It is meant to group a lot of \nrelated information together.',
    TLDR: 'Used for grouping a lot of info together',
  },
];

const AboutNodes = () => {
  return (
    <div className=' w-full'>
      <MainTitle text='About Nodes' />
      <Text text='The root node will not be convertible in any way. It will be and remain the starting point.' />
      <div className='mb-10' />
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

export default AboutNodes;
