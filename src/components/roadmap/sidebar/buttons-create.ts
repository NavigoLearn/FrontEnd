import notick from '@assets/notick.svg';
import yestick from '@assets/yestick.svg';
import { setRoadmapId } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
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
      dispatchAnalyticsEvent('roadmapInteraction', {
        actionType: 'Create Roadmap',
      });
      // window.location.href = '/profile';
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
];

export default buttonsCreate;
