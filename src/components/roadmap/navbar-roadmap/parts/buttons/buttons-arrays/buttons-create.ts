import { setRoadmapId } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { postRoadmapData } from '@src/api-wrapper/roadmap/roadmaps';
import { setDisplayPageTypeFullScreen } from '@src/store/roadmap-refactor/display/display-manager-full-screen';

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
    name: 'Publish',
    callback: async () => {
      // sending the roadmap to be created
      await postRoadmapData(roadmapSelector.get()).then((roadmapId) => {
        setRoadmapId(roadmapId.id);
      });
      window.location.href = '/profile';
    },
  },

  {
    name: 'Save as draft',
    callback: async () => {
      console.log('save as draft to be implemented');
    },
  },
  {
    name: 'About',
    callback: async () => {
      setDisplayPageTypeFullScreen('about');
    },
  },

  {
    name: 'Cancel',
    callback: () => {
      window.location.href = '/explore';
    },
  },
];
