import React from 'react';
import Roadmap from '@components/roadmap/Roadmap';
import { IRoadmapApi } from '@src/types/explore_old/card';
import { NotificationProvider } from './to-be-organized/notifications/NotificationLogic';

const RoadmapWithNotifications = ({
  pageId,
  roadmap,
}: {
  pageId: string;
  roadmap: IRoadmapApi;
}) => {
  return (
    <NotificationProvider>
      <Roadmap pageId={pageId} roadmap={roadmap} />
    </NotificationProvider>
  );
};

export default RoadmapWithNotifications;
