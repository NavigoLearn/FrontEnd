import {
  buttonsCreateAnonymus,
  buttonsCreateLogged,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-create';
import { buttonsPublicEdit } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-edit';
import { buttonsDraft } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-draft';
import {
  getRoadmapState,
  getRoadmapStateStore,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  buttonsPublicAnonymus,
  buttonsPublicOwner,
  buttonsPublicVisitor,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-view';
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
  console.log('state', state);
  console.log('isLogged', isLogged);
  console.log('isOwner', isOwner);

  if (!isLogged) {
    buttons.push(...buttonsPublicAnonymus);
  } else if (isLogged && !isOwner) {
    buttons.push(...buttonsPublicVisitor);
  } else if (isLogged && isOwner) {
    if (state === 'edit') {
      buttons.push(...buttonsPublicEdit);
    } else if (state === 'view') {
      buttons.push(...buttonsPublicOwner);
    }
  }
  return buttons;
}

function getDraftButtons(
  isLogged: boolean,
  isOwner: boolean
): INavbarRoadmapButton[] {
  const buttons: INavbarRoadmapButton[] = [];
  buttons.push(...buttonsDraft);
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
    buttons.push(...buttonsPublicOwner);
  } else if (isLogged && !isOwner) {
    buttons.push(...buttonsPublicVisitor);
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

  console.log('isLogged', ownerId, userId);
  const isOwner = userId === ownerId;
  const roadmapType = getRoadmapType();
  console.log('roadmapType', roadmapType);

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
