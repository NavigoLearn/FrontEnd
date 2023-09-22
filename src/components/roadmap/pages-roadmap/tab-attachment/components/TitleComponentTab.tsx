import React from 'react';
import { type IAttachmentTabTitleProperties } from '@type/roadmap/node/tab-types';

type ITitleComponentProps = {
  component: IAttachmentTabTitleProperties;
};
const TitleComponentTab = ({ component }: ITitleComponentProps) => {
  return <div className='px-9'>{component.titleText || 'No title yet.'}</div>;
};

export default TitleComponentTab;
