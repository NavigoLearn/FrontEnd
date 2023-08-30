import React from 'react';
import { IAttachmentTabDescriptionProperties } from '@type/roadmap/node/tab-types';

type IDescriptionComponentProps = {
  component: IAttachmentTabDescriptionProperties;
};
const DescriptionComponentTab = ({ component }: IDescriptionComponentProps) => {
  return (
    <div>
      <div className='flex gap-2 w-full font-roboto-text text-secondary text-lg mt-3 mb-5 px-9'>
        {component.descriptionText || 'No description yet'}
      </div>
    </div>
  );
};

export default DescriptionComponentTab;
