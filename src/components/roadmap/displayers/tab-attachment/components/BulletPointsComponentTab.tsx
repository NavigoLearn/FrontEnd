import React from 'react';
import { IAttachmentTabBulletListProperties } from '@type/roadmap/node/tab-types';
import { ResourceAttachmentView } from '../../editor/components/attachment/ResourceAttachment';

type IResourceAttachmentProps = {
  component: IAttachmentTabBulletListProperties;
};
const BulletPointsComponentTab = ({ component }: IResourceAttachmentProps) => {
  return (
    <div>
      <ResourceAttachmentView component={component} />
    </div>
  );
};

export default BulletPointsComponentTab;
