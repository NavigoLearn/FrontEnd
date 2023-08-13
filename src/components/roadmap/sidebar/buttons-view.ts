import edit from '@assets/edit.svg';
import issues from '@assets/issues.svg';
import about from '@assets/about.svg';
import cross from '@assets/cross.svg';
import book from '@assets/book.svg';
import roadmapState, { getRoadmapId } from '@store/roadmap/data/roadmap_state';
import {
  enterEditingModeProtocol,
  saveEditingProtocol,
} from '@src/typescript/roadmap/roadmap-state-protocols';
import { toggleEditing } from '@src/typescript/roadmap/roadmap-edit-logic-decorated';
import { setTabAboutFlow } from '@src/typescript/roadmap/tab-logic-flows';
import { dispatchAnalyticsEvent } from '@store/misc/analytics';
import { setConfirmDelete } from '@store/roadmap-refactor/popups/popup';

export const buttonsTryTool = [
  {
    id: 1,
    cIcon: about,
    title: 'Sign up',
    clickHandler: () => {
      window.location.href = '/signup';
    },
  },
];
export const buttonsViewVisitor = [
  {
    id: 2,
    cIcon: issues,
    title: 'Issues',
    clickHandler: () => {
      // setIssues();
      dispatchAnalyticsEvent('roadmapInteraction', {
        actionType: 'Open Issues',
      });
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
  {
    id: 5,
    cIcon: book,
    title: 'Guide',
    clickHandler: () => {
      // setBook();
    },
  },
];
export const buttonsViewOwner = [
  {
    id: 1,
    cIcon: edit,
    title: 'Edit',
    clickHandler: () => {
      // startEditingProtocol();
      // persist the changes to the original roadmap_static
      if (roadmapState.get().editing) {
        saveEditingProtocol();
      } else {
        enterEditingModeProtocol();
        dispatchAnalyticsEvent('roadmapInteraction', {
          actionType: 'Edit Roadmap',
        });
      }
      // falseOpen();
      toggleEditing();
    },
  },

  {
    id: 2,
    cIcon: issues,
    title: 'Issues',
    clickHandler: () => {
      // setIssues();
      dispatchAnalyticsEvent('roadmapInteraction', {
        actionType: 'Open Issues',
      });
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
  {
    id: 5,
    cIcon: book,
    title: 'Guide',
    clickHandler: () => {
      // setBook();
    },
  },
  {
    id: 4,
    cIcon: cross,
    title: 'Delete',
    clickHandler: () => {
      // delete roadmap
      setConfirmDelete();
      dispatchAnalyticsEvent('roadmapInteraction', {
        actionType: 'Delete Roadmap',
      });
    },
  },
];
