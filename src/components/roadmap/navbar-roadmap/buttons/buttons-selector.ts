import {
  buttonsCreateAnonymus,
  buttonsCreateLogged,
} from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-create.ts';
import { buttonsDraftOwnerView } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-draft.ts';
import {
  getIsEditing,
  getRoadmapState,
  getRoadmapStateStore,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state.ts';
import { buttonsPublicOwnerView } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-public.ts';
import { getUserStatus } from '@store/user/user-status.ts';
import {
  getRoadmapAbout,
  getRoadmapType,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import { buttonsEditingRoadmap } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-general.ts';
import { type IButtonRoadmapNavbarProperties } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';

function getPublicButtons(isLogged, isOwner): IButtonRoadmapNavbarProperties[] {
  const state = getRoadmapState();
  const buttons: IButtonRoadmapNavbarProperties[] = [];
  const editing = getIsEditing();

  if (!editing) {
    buttons.push(...buttonsPublicOwnerView);
  } else {
    buttons.push(...buttonsEditingRoadmap);
  }

  return buttons;
}

function getDraftButtons(
  isLogged: boolean,
  isOwner: boolean
): IButtonRoadmapNavbarProperties[] {
  const editing = getIsEditing();
  const buttons: IButtonRoadmapNavbarProperties[] = [];

  if (!editing) {
    buttons.push(...buttonsDraftOwnerView);
  } else {
    buttons.push(...buttonsEditingRoadmap);
  }
  return buttons;
}

function getCreateButtons(
  isLogged: boolean,
  isOwner: boolean
): IButtonRoadmapNavbarProperties[] {
  const buttons: IButtonRoadmapNavbarProperties[] = [];

  if (isLogged) {
    buttons.push(...buttonsCreateLogged);
  } else if (!isLogged) {
    buttons.push(...buttonsCreateAnonymus);
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

export function getNavbarRoadmapButtonsOwner(): IButtonRoadmapNavbarProperties[] {
  const buttons: IButtonRoadmapNavbarProperties[] = [];
  if (!getButtonsShouldLoad()) {
    console.warn('Something went wrong with loading buttons');
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
