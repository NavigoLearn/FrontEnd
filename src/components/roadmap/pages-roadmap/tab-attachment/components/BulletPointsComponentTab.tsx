import React from 'react';
import { type IAttachmentTabBulletListProperties } from '@type/roadmap/node/tab-types';
import { ResourceAttachmentView } from '@components/roadmap/pages-roadmap/editor/editor-pages/tab-page/components/ResourceAttachment';

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
