import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import { enterEditingModeProtocol } from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import { publishRoadmapProtocol } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/protocols';
import {
  fetchDeleteRoadmap,
  fetchUpdateRoadmapIsDraft,
} from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import { fetchDeleteComment } from '@src/api-wrapper/roadmap/deprecated/issues';
import fullScreenTabManager from '@components/roadmap/pages-roadmap/FullScreenTabManager';

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
    name: 'Hide progress',
    callback: () => {
      // TODO
    },
  },

  'save-changes': {
    name: 'Save',
    callback: () => {
      // TODO
    },
  },
  'cancel-changes': {
    name: 'Cancel',
    callback: () => {
      // TODO
    },
  },
};

export function requestButton(
  buttonType: IButtonsRoadmapNavbarOptions
): IButtonProperties {
  return buttonsMapper[buttonType];
}

// import {
//   setConfirmCancel,
//   setConfirmSave,
// } from '@store/roadmap-refactor/popups/popup';
//
// export const buttonsPublicEdit = [
//   {
//     name: 'Save',
//     callback: async () => {
//       setConfirmSave();
//     },
//   },
//   {
//     name: 'Cancel Changes',
//     callback: async () => {
//       setConfirmCancel();
//     },
//   },
// ];
//
//
