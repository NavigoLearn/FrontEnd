import React from 'react';
import { IAttachmentTabTitleProperties } from '@type/roadmap/node/tab-types';

type ITitleComponentProps = {
  component: IAttachmentTabTitleProperties;
};
const TitleComponentTab = ({ component }: ITitleComponentProps) => {
  return (
    <div className='my-5'>
      <div className='text-gray-400 font-roboto-text'>Title</div>
      <div className='text-darkBlue text-lg font-roboto-text'>
        {component.titleText || 'No title yet'}
      </div>
    </div>
  );
};

export default TitleComponentTab;
