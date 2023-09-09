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

export type IButtonsRoadmapNavbarOptions =
  | 'get-started'
  | 'reset-roadmap'
  | 'about'
  | 'edit'
  | 'publish'
  | 'save-as-draft'
  | 'convert-to-draft'
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
      setDisplayPageTypeFullScreen('get-started');
    },
  },
  'reset-roadmap': {
    name: 'Reset roadmap',
    callback: () => {
      setDisplayPageTypeFullScreen('reset-roadmap');
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
      enterEditingModeProtocol();
    },
  },
  publish: {
    name: 'Publish',
    callback: () => {
      publishRoadmapProtocol(false);
    },
  },
  'save-as-draft': {
    name: 'Save as draft',
    callback: () => {
      publishRoadmapProtocol(true);
    },
  },
  'convert-to-draft': {
    name: 'Convert to draft',
    callback: () => {
      fetchUpdateRoadmapIsDraft(true);
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
      saveEditingProtocol();
      setDisplayPageTypeFullScreen('closed');
    },
  },
  'cancel-changes': {
    name: 'Cancel',
    callback: () => {
      cancelEditingProtocol();
      setDisplayPageTypeFullScreen('closed');
    },
  },
};

export function requestButton(
  buttonType: IButtonsRoadmapNavbarOptions
): IButtonProperties {
  return buttonsMapper[buttonType];
}
