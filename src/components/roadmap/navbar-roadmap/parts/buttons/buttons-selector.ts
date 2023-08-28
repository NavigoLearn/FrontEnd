import {
  buttonsCreateAnonymus,
  buttonsCreateLogged,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-create';
import { buttonsEdit } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-edit';
import { buttonsDraft } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-draft';
import { IRoadmapState } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import bio from '@components/profile/common/components/Bio';
import { boundCoordsToNode } from '@src/typescript/roadmap_ref/dragging/strategies/dragging-strategies';

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
  if (isLogged && isOwner) {
    buttons.push(...buttonsCreateLogged);
  } else if (!isLogged) {
    buttons.push(...buttonsCreateAnonymus);
  } else {
    throw new Error('Invalid user type or role');
  }
  return buttons;
}

function getViewButtons(
  isLogged: boolean,
  isOwner: boolean
): INavbarRoadmapButton[] {
  const buttons: INavbarRoadmapButton[] = [];
  if (isLogged && isOwner) {
    buttons.push(...buttonsCreateLogged);
  } else if (isLogged && !isOwner) {
    buttons.push(...buttonsCreateLogged);
  } else if (!isLogged) {
    buttons.push(...buttonsCreateAnonymus);
  } else {
    throw new Error('Invalid user type or role');
  }
  return buttons;
}

export function getNavbarRoadmapButtons(
  roadmapState: IRoadmapState,
  isLogged: boolean,
  isOwner: boolean
): INavbarRoadmapButton[] {
  const buttons: INavbarRoadmapButton[] = [];

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
