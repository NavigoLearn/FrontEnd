import { setRoadmapId } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { postRoadmapData } from '@src/api-wrapper/roadmap/roadmaps';

export const buttonsCreateAnonymus = [
  {
    name: 'Login',
    callback: async () => {
      // sending the roadmap to be created
      window.location.href = '/login';
    },
  },

  {
    name: 'Sign up',
    callback: () => {
      window.location.href = '/signup';
    },
  },
];
export const buttonsCreateLogged = [
  {
    name: 'Create',
    callback: async () => {
      // sending the roadmap to be created
      await postRoadmapData(roadmapSelector.get()).then((roadmapId) => {
        setRoadmapId(roadmapId.id);
      });
      window.location.href = '/profile';
    },
  },

  {
    name: 'Cancel',
    callback: () => {
      window.location.href = '/explore';
    },
  },
];
