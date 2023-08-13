import React from 'react';
import { IAttachmentTabTitleProperties } from '@type/roadmap/node/tab-types';

type ITitleComponentProps = {
  component: IAttachmentTabTitleProperties;
};
const TitleComponentTab = ({ component }: ITitleComponentProps) => {
  return (
    <div>
      <div>tittle here</div>
    </div>
  );
};

export default TitleComponentTab;
