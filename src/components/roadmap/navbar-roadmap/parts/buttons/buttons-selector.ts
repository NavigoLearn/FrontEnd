import {
  buttonsCreateAnonymus,
  buttonsCreateLogged,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-create';
import {
  buttonsDraft,
  buttonsDraftOwnerView,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-draft';
import {
  getIsEditing,
  getRoadmapState,
  getRoadmapStateStore,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  buttonsPublicAnonymus,
  buttonsPublicOwnerView,
  buttonsPublicLoggedVisitor,
  buttonsPublicOwnerEdit,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-public';
import { getUserStatus } from '@store/user/user-status';
import {
  getRoadmapAbout,
  getRoadmapType,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

export type INavbarRoadmapButton = {
  name: string;
  callback: () => void;
};

function getPublicButtons(isLogged, isOwner): INavbarRoadmapButton[] {
  const state = getRoadmapState();
  const buttons: INavbarRoadmapButton[] = [];

  if (!isLogged) {
    buttons.push(...buttonsPublicAnonymus);
  } else if (isLogged && !isOwner) {
    buttons.push(...buttonsPublicLoggedVisitor);
  } else if (isLogged && isOwner) {
    if (state === 'edit') {
      buttons.push(...buttonsPublicOwnerEdit);
    } else if (state === 'view') {
      buttons.push(...buttonsPublicOwnerView);
    }
  }
  return buttons;
}

function getDraftButtons(
  isLogged: boolean,
  isOwner: boolean
): INavbarRoadmapButton[] {
  const editing = getIsEditing();
  const buttons: INavbarRoadmapButton[] = [];

  if (editing) {
    buttons.push(...buttonsDraft);
  } else {
    buttons.push(...buttonsDraftOwnerView);
  }
  return buttons;
}

function getCreateButtons(
  isLogged: boolean,
  isOwner: boolean
): INavbarRoadmapButton[] {
  const buttons: INavbarRoadmapButton[] = [];
  if (isLogged) {
    buttons.push(...buttonsCreateLogged);
  } else if (!isLogged) {
    buttons.push(...buttonsCreateAnonymus);
  }
  return buttons;
}

function getViewButtons(
  isLogged: boolean,
  isOwner: boolean
): INavbarRoadmapButton[] {
  const buttons: INavbarRoadmapButton[] = [];
  if (isLogged && isOwner) {
    buttons.push(...buttonsPublicOwnerView);
  } else if (isLogged && !isOwner) {
    buttons.push(...buttonsPublicLoggedVisitor);
  } else if (!isLogged) {
    buttons.push(...buttonsCreateAnonymus);
  } else {
    throw new Error('Invalid user type or role');
  }
  return buttons;
}

function getButtonsShouldLoad(): boolean {
  const roadmapType = getRoadmapType();

  const { loaded: loadedRoadmap } = getRoadmapStateStore();
  const { loaded: loadedUserData } = getUserStatus();

  if (roadmapType === 'create' && loadedRoadmap) {
    return true;
  }

  if (
    (roadmapType === 'public' || roadmapType === 'draft') &&
    loadedRoadmap &&
    loadedUserData
  ) {
    return true;
  }

  return false;
}

export function getNavbarRoadmapButtons(): INavbarRoadmapButton[] {
  const buttons: INavbarRoadmapButton[] = [];
  if (!getButtonsShouldLoad()) {
    return buttons;
  }
  const { isLogged, userId } = getUserStatus();
  const { ownerId } = getRoadmapAbout();

  const isOwner = userId === ownerId;
  const roadmapType = getRoadmapType();

  if (roadmapType === 'create') {
    buttons.push(...getCreateButtons(isLogged, isOwner));
  }

  if (roadmapType === 'public') {
    buttons.push(...getPublicButtons(isLogged, isOwner));
  }

  if (roadmapType === 'draft') {
    buttons.push(...getDraftButtons(isLogged, isOwner));
  }

  return buttons;
}
