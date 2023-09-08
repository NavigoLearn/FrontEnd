import { setRoadmapId } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { postRoadmapData } from '@src/api-wrapper/roadmap/routes/roadmaps';
import {
  setPostRoadmapPayloadFromExistingStores,
  setPostRoadmapPostPayloadIsDraft,
  setPostRoadmapPostPayloadIsPublic,
} from '@src/api-wrapper/roadmap/stores/roadmap-payload';
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

      setPostRoadmapPayloadFromExistingStores();
      setPostRoadmapPostPayloadIsDraft(false);
      setPostRoadmapPostPayloadIsPublic(true);

      await postRoadmapData().then((roadmapId) => {
        setRoadmapId(roadmapId.id);
      });
      window.location.href = '/profile';
    },
  },

  {
    name: 'Save as draft',
    callback: async () => {
      // sending the roadmap to be created

      setPostRoadmapPayloadFromExistingStores();
      setPostRoadmapPostPayloadIsDraft(true);
      setPostRoadmapPostPayloadIsPublic(false);

      await postRoadmapData().then((roadmapId) => {
        setRoadmapId(roadmapId.id);
      });
      window.location.href = '/profile';
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
