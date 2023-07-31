import notick from '@assets/notick.svg';
import yestick from '@assets/yestick.svg';
import { getRoadmapId, setRoadmapId } from '@store/roadmap/data/roadmap_state';
import about from '@assets/about.svg';
import { setTabAboutFlow } from '@src/typescript/roadmap/tab-logic-flows';
import { createNewTabs } from '@store/roadmap/cache/diff-tabs';
import book from '@assets/book.svg';
import { dispatchAnalyticsEvent } from '@store/misc/analytics';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { postRoadmapData } from '../../../api-wrapper/roadmap/roadmaps';

const buttonsCreate = [
  {
    id: 1,
    cIcon: yestick,
    title: 'Create',
    clickHandler: async () => {
      // sending the roadmap to be created
      await postRoadmapData(roadmapSelector.get()).then((roadmapId) => {
        setRoadmapId(roadmapId.id);
      });
      await createNewTabs();
      dispatchAnalyticsEvent('roadmapInteraction', {
        actionType: 'Create Roadmap',
      });
      window.location.href = '/profile';
    },
  },

  {
    id: 2,
    cIcon: notick,
    title: 'Cancel',
    clickHandler: () => {
      // canceling the roadmap creation and redirect to explore
      dispatchAnalyticsEvent('roadmapInteraction', {
        actionType: 'Cancel Create Roadmap',
      });
      window.location.href = '/explore';
    },
  },

  {
    id: 5,
    cIcon: book,
    title: 'Guide',
    clickHandler: () => {
      // setBook();
    },
  },

  {
    id: 3,
    cIcon: about,
    title: 'About',
    clickHandler: () => {
      setTabAboutFlow(getRoadmapId());
      dispatchAnalyticsEvent('roadmapInteraction', {
        actionType: 'Open About',
      });
    },
  },
];

export default buttonsCreate;
