import React from 'react';
import { IAttachmentTabBulletListProperties } from '@type/roadmap/node/tab-types';

type IBulletPointsComponentProps = {
  component: IAttachmentTabBulletListProperties;
};
const BulletPointsComponentTab = ({
  component,
}: IBulletPointsComponentProps) => {
  return (
    <div>
      <div>bullet points here</div>
    </div>
  );
};

export default BulletPointsComponentTab;
