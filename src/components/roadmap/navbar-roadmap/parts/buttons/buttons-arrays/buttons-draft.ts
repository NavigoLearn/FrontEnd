import { setRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { postRoadmapData } from '@src/api-wrapper/roadmap/routes/roadmaps';

export const buttonsDraft = [
  {
    name: 'Publish',
    callback: async () => {
      // TODO: Implement Publish functionality
    },
  },
  {
    name: 'Save',
    callback: async () => {
      // TODO: Implement Save functionality
      window.location.href = '/profile';
    },
  },
  {
    name: 'Cancel Changes',
    callback: () => {
      window.location.href = '/explore';
    },
  },
  {
    name: 'About',
    callback: () => {
      // TODO: Implement About functionality
    },
  },
  {
    name: 'Delete',
    callback: () => {
      // TODO: Implement Delete functionality
    },
  },
];
