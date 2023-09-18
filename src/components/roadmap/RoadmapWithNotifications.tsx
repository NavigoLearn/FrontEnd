import React from 'react';
import Roadmap from '@components/roadmap/Roadmap';
import { IRoadmapApi } from '@src/types/explore_old/card';
import NotificationRenderer from './to-be-organized/notifications/notifciations-refr/NotificationRenderer';

const RoadmapWithNotifications = ({
  pageId,
  roadmap,
}: {
  pageId: string;
  roadmap: IRoadmapApi;
}) => {
  return (
    <>
      <div className='fixed bottom-3 left-1/2 transform -translate-x-1/2'>
        <NotificationRenderer />
      </div>
      <Roadmap pageId={pageId} roadmap={roadmap} />
    </>
  );
};

export default RoadmapWithNotifications;
