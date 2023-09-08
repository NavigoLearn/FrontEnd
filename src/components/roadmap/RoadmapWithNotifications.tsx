import React from 'react';
import Roadmap from '@components/roadmap/Roadmap';
import { RoadmapTypeApi } from '@src/types/explore_old/card';
import { NotificationProvider } from './to-be-organized/notifications/NotificationLogic';

const RoadmapWithNotifications = ({
  pageId,
  roadmap,
}: {
  pageId: string;
  roadmap: RoadmapTypeApi;
}) => {
  return (
    <NotificationProvider>
      <Roadmap pageId={pageId} roadmap={roadmap} />
    </NotificationProvider>
  );
};

export default RoadmapWithNotifications;
