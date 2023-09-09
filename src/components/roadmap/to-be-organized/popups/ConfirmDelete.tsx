import React from 'react';
import { setConfirmDelete } from '@store/roadmap-refactor/popups/popup';
import { fetchDeleteRoadmap } from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import { dispatchAnalyticsEvent } from '@store/misc/analytics';
import Popup from '@components/roadmap/to-be-organized/popups/Popup';
import { getRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

const ConfirmDelete = () => {
  return (
    <Popup
      title='Are you sure you want to delete this roadmap? :((('
      confirmText='Delete'
      cancelText='Go back'
      onConfirm={() => {
        dispatchAnalyticsEvent('roadmapInteraction', {
          actionType: 'Delete Roadmap',
        });
        fetchDeleteRoadmap(getRoadmapId());
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
