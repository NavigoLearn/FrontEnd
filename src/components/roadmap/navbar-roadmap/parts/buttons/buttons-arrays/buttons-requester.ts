import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import {
  enterEditingModeProtocol,
  cancelEditingProtocol,
  saveEditingProtocol,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import { publishRoadmapProtocol } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/protocols';
import { fetchUpdateRoadmapIsDraft } from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import {
  setHideProgress,
  toggleProgressView,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { triggerAllNodesRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { clearSession } from '@src/typescript/roadmap_ref/caching/restoreSession';
import { getAsyncLoadingCounter } from '@components/roadmap/rendering-engines/async-loading/store-async-loading.ts';

export type IButtonsRoadmapNavbarOptions =
  | 'get-started'
  | 'reset-roadmap'
  | 'about'
  | 'edit'
  | 'publish'
  | 'save-as-draft'
  | 'convert-to-draft'
  | 'convert-to-public'
  | 'delete'
  | 'hide-progress'
  | 'save-changes'
  | 'cancel-changes';

type IButtonProperties = {
  name: string;
  callback: () => void;
};
const buttonsMapper: Record<IButtonsRoadmapNavbarOptions, IButtonProperties> = {
  'get-started': {
    name: 'Get started',
    callback: () => {
      setDisplayPageTypeFullScreen(
        'get-started',
        'Login to unlock progress tracking'
      );
    },
  },
  'reset-roadmap': {
    name: 'Reset roadmap',
    callback: () => {
      setDisplayPageTypeFullScreen('reset-roadmap');
      clearSession();
    },
  },
  about: {
    name: 'About',
    callback: () => {
      setDisplayPageTypeFullScreen('about');
    },
  },
  edit: {
    name: 'Edit',
    callback: () => {
      if (getAsyncLoadingCounter() !== 0) return;
      enterEditingModeProtocol();
    },
  },
  publish: {
    name: 'Publish',
    callback: () => {
      publishRoadmapProtocol(false);
      clearSession();
    },
  },
  'save-as-draft': {
    name: 'Save as draft',
    callback: () => {
      publishRoadmapProtocol(true);
      clearSession();
    },
  },
  'convert-to-draft': {
    name: 'Convert to draft',
    callback: () => {
      fetchUpdateRoadmapIsDraft(true).then(() => {
        location.reload();
      });
    },
  },
  delete: {
    name: 'Delete',
    callback: () => {
      setDisplayPageTypeFullScreen('delete-roadmap');
    },
  },
  'hide-progress': {
    name: 'Show/Hide progress',
    callback: () => {
      toggleProgressView();
      triggerAllNodesRerender();
    },
  },

  'save-changes': {
    name: 'Save',
    callback: () => {
      // saveEditingProtocol();
      setDisplayPageTypeFullScreen('save-changes');
    },
  },
  'cancel-changes': {
    name: 'Cancel',
    callback: () => {
      // cancelEditingProtocol();
      setDisplayPageTypeFullScreen('cancel-changes');
    },
  },
  'convert-to-public': {
    name: 'Publish draft',
    callback: () => {
      fetchUpdateRoadmapIsDraft(false).then(() => {
        location.reload();
      });
    },
  },
};

export function requestButton(
  buttonType: IButtonsRoadmapNavbarOptions
): IButtonProperties {
  return buttonsMapper[buttonType];
}
