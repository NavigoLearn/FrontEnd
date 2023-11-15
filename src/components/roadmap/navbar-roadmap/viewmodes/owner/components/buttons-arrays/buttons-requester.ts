import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen.ts';
import { enterEditingModeProtocol } from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols.ts';
import { publishRoadmapProtocol } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/protocols.ts';
import { fetchUpdateRoadmapIsDraft } from '@src/api-wrapper/roadmap/routes/routes-roadmaps.ts';
import {
  setHideProgress,
  toggleProgressView,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state.ts';
import { triggerAllNodesRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes.ts';
import { clearSession } from '@src/typescript/roadmap_ref/caching/restoreSession.ts';
import { getAsyncLoadingCounter } from '@components/roadmap/rendering-engines/async-loading/store-async-loading.ts';
import {
  User2,
  RotateCcw,
  Pencil,
  BookPlus,
  BookDashed,
  Trash2,
  Save,
  Ban,
} from 'lucide-react';

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

export type IButtonRoadmapNavbarProperties = {
  name: string;
  callback: () => void;
  IconComponent: React.FC;
};

const buttonsMapper: Record<
  IButtonsRoadmapNavbarOptions,
  IButtonRoadmapNavbarProperties
> = {
  'get-started': {
    name: 'Login',
    callback: () => {
      setDisplayPageTypeFullScreen(
        'get-started',
        'Unlock progress tracking, upvotes, and more!'
      );
    },
    IconComponent: User2,
  },
  'reset-roadmap': {
    name: 'Reset roadmap',
    callback: () => {
      setDisplayPageTypeFullScreen('reset-roadmap');
      clearSession();
    },
    IconComponent: RotateCcw,
  },
  about: {
    name: 'About',
    callback: () => {
      setDisplayPageTypeFullScreen('about');
    },
    IconComponent: null,
  },
  edit: {
    name: 'Edit',
    callback: () => {
      if (getAsyncLoadingCounter() !== 0) return;
      enterEditingModeProtocol();
    },
    IconComponent: Pencil,
  },
  publish: {
    name: 'Publish',
    callback: () => {
      publishRoadmapProtocol(false);
      clearSession();
    },
    IconComponent: BookPlus,
  },
  'save-as-draft': {
    name: 'Save as draft',
    callback: () => {
      publishRoadmapProtocol(true);
      clearSession();
    },
    IconComponent: BookDashed,
  },
  'convert-to-draft': {
    name: 'Convert to draft',
    callback: () => {
      fetchUpdateRoadmapIsDraft(true).then(() => {
        location.reload();
      });
    },
    IconComponent: BookDashed,
  },
  delete: {
    name: 'Delete',
    callback: () => {
      setDisplayPageTypeFullScreen('delete-roadmap');
    },
    IconComponent: Trash2,
  },
  'hide-progress': {
    name: 'Show/Hide progress',
    callback: () => {
      toggleProgressView();
      triggerAllNodesRerender();
    },
    IconComponent: null,
  },

  'save-changes': {
    name: 'Save',
    callback: () => {
      // saveEditingProtocol();
      setDisplayPageTypeFullScreen('save-changes');
    },
    IconComponent: Save,
  },
  'cancel-changes': {
    name: 'Cancel',
    callback: () => {
      // cancelEditingProtocol();
      setDisplayPageTypeFullScreen('cancel-changes');
    },
    IconComponent: Ban,
  },
  'convert-to-public': {
    name: 'Publish draft',
    callback: () => {
      fetchUpdateRoadmapIsDraft(false).then(() => {
        location.reload();
      });
    },
    IconComponent: BookPlus,
  },
};

export function requestButton(
  buttonType: IButtonsRoadmapNavbarOptions
): IButtonRoadmapNavbarProperties {
  return buttonsMapper[buttonType];
}
