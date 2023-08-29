import {
  buttonsCreateAnonymus,
  buttonsCreateLogged,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-create';
import { buttonsEdit } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-edit';
import { buttonsDraft } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-draft';
import roadmapStateStore, {
  getRoadmapState,
  getRoadmapStateStoreData,
  IRoadmapState,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import bio from '@components/profile/common/components/Bio';
import { boundCoordsToNode } from '@src/typescript/roadmap_ref/dragging/strategies/dragging-strategies';
import {
  buttonsViewOwner,
  buttonsViewVisitor,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-view';
import React from 'react';
import { useStore } from '@nanostores/react';
import userStatusStore, { getUserStatus } from '@store/user/user-status';
import roadmapVisitData, {
  getRoadmapVisitData,
} from '@store/roadmap-refactor/roadmap-data/roadmap-visit-data';

export type INavbarRoadmapButton = {
  name: string;
  callback: () => void;
};

function getEditButtons(): INavbarRoadmapButton[] {
  const buttons: INavbarRoadmapButton[] = [];
  buttons.push(...buttonsEdit);
  return buttons;
}

function getDraftButtons(): INavbarRoadmapButton[] {
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
    buttons.push(...buttonsViewOwner);
  } else if (isLogged && !isOwner) {
    buttons.push(...buttonsViewVisitor);
  } else if (!isLogged) {
    buttons.push(...buttonsCreateAnonymus);
  } else {
    throw new Error('Invalid user type or role');
  }
  return buttons;
}

function getButtonsShouldLoad(): boolean {
  const { roadmapState, loaded: loadedRoadmap } = getRoadmapStateStoreData();
  const { loaded: loadedUserData, isLogged } = getUserStatus();
  const { loaded: loadedRoadmapVisitData, visitorIsOwner } =
    getRoadmapVisitData();
  if (roadmapState === 'create' && loadedRoadmap) {
    return true;
  }
  if (roadmapState === 'edit' && loadedRoadmap && loadedUserData) {
    return true;
  }
  if (
    roadmapState === 'view' &&
    loadedRoadmap &&
    loadedUserData &&
    loadedRoadmapVisitData
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

  const { roadmapState } = getRoadmapStateStoreData();
  const { isLogged } = getUserStatus();
  const { visitorIsOwner: isOwner } = getRoadmapVisitData();

  if (roadmapState === 'create') {
    buttons.push(...getCreateButtons(isLogged, isOwner));
  }

  if (roadmapState === 'edit') {
    buttons.push(...getEditButtons());
  }

  if (roadmapState === 'view') {
    buttons.push(...getViewButtons(isLogged, isOwner));
  }

  if (roadmapState === 'draft') {
    buttons.push(...getDraftButtons());
  }

  return buttons;
}
