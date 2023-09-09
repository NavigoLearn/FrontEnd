import {
  IButtonsRoadmapNavbarOptions,
  requestButton,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-requester';

export const buttonsDraftOwnerEditArray: IButtonsRoadmapNavbarOptions[] = [
  'save-changes',
  'cancel-changes',
];
export const buttonsDraftOwnerEdit = buttonsDraftOwnerEditArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);

const buttonsDraftOwnerViewArray: IButtonsRoadmapNavbarOptions[] = [
  'edit',
  'publish',
  'about',
  'hide-progress',
  'delete',
];
export const buttonsDraftOwnerView = buttonsDraftOwnerViewArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);
