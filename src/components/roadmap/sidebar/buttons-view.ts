import edit from '@assets/edit.svg';
import issues from '@assets/issues.svg';
import about from '@assets/about.svg';
import cross from '@assets/cross.svg';
import book from '@assets/book.svg';
import roadmapStateStore, {
  getIsEditing,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import {
  enterEditingModeProtocol,
  saveEditingProtocol,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
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
      // persist the changes to the original roadmap_static
      if (getIsEditing()) {
        saveEditingProtocol();
      } else {
        enterEditingModeProtocol();
        dispatchAnalyticsEvent('roadmapInteraction', {
          actionType: 'Edit Roadmap',
        });
      }
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
