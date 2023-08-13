import React from 'react';
import { IAttachmentTabDescriptionProperties } from '@type/roadmap/node/tab-types';

type IDescriptionComponentProps = {
  component: IAttachmentTabDescriptionProperties;
};
const DescriptionComponentTab = ({ component }: IDescriptionComponentProps) => {
  return (
    <div className='text-black text-secondary'>{component.descriptionText}</div>
  );
};

export default DescriptionComponentTab;
