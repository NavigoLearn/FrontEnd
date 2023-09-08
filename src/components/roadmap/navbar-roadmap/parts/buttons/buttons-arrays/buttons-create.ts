import { setRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { postRoadmapData } from '@src/api-wrapper/roadmap/routes/roadmaps';
import {
  setPostRoadmapPayloadFromExistingStores,
  setPostRoadmapPostPayloadIsDraft,
  setPostRoadmapPostPayloadIsPublic,
} from '@src/api-wrapper/roadmap/stores/roadmap-payload';
import { setDisplayPageTypeFullScreen } from '@src/store/roadmap-refactor/display/display-manager-full-screen';
import { pullStoreAboutTempFromApp } from '@components/roadmap/to-be-organized/about/stores/store-about-temp';
import { setBasePopup } from '@components/shared/stores/store-base-popups';

export const buttonsCreateAnonymus = [
  {
    name: 'Get started',
    callback: () => {
      setDisplayPageTypeFullScreen('get-started');
    },
  },
  {
    name: 'Reset roadmap',
    callback: () => {
      setDisplayPageTypeFullScreen('reset-roadmap');
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
      pullStoreAboutTempFromApp();
    },
  },

  {
    name: 'Reset roadmap',
    callback: () => {
      setDisplayPageTypeFullScreen('reset-roadmap');
    },
  },

  {
    name: 'Cancel',
    callback: () => {
      window.location.href = '/explore';
    },
  },
];
