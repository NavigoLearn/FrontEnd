import React from 'react';
import { setConfirmDelete } from '@store/roadmap-refactor/popups/popup';
import { deleteRoadmap } from '@src/api-wrapper/roadmap/roadmaps';
import {
  getRoadmapId,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { dispatchAnalyticsEvent } from '@store/misc/analytics';
import Popup from '@components/roadmap/to-be-organized/popups/Popup';

const ConfirmDelete = () => {
  return (
    <Popup
      title={'Are you sure you want to delete this roadmap? :((('}
      confirmText={'Delete'}
      cancelText={'Go back'}
      onConfirm={() => {
        dispatchAnalyticsEvent('roadmapInteraction', {
          actionType: 'Delete Roadmap',
        });
        deleteRoadmap(getRoadmapId());
        setConfirmDelete();
        window.location.href = '/profile';
      }}
      onCancel={() => {
        setConfirmDelete();
      }}
    />
  );
};

export default ConfirmDelete;
