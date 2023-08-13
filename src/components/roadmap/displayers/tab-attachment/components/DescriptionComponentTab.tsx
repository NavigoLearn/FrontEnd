import React from 'react';
import { IAttachmentTabDescriptionProperties } from '@type/roadmap/node/tab-types';
import { DescriptionAttachmentView } from '../../editor/components/attachment/DescriptionAttachment';

type IDescriptionComponentProps = {
  component: IAttachmentTabDescriptionProperties;
};
const DescriptionComponentTab = ({ component }: IDescriptionComponentProps) => {
  return (
    <div>
      <h1 className='text-gray-400 font-roboto-text'>Description</h1>
      <div className='flex gap-2 w-full font-roboto-text text-darkBlue text-lg'>
        {component.descriptionText || 'No description yet'}
      </div>
    </div>
  );
};

export default DescriptionComponentTab;
