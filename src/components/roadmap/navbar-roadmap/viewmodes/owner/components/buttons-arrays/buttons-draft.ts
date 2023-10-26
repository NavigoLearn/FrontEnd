import {
  type IButtonsRoadmapNavbarOptions,
  requestButton,
} from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';

const buttonsDraftOwnerViewArray: IButtonsRoadmapNavbarOptions[] = [
  'edit',
  'convert-to-public',
  'delete',
];
export const buttonsDraftOwnerView = buttonsDraftOwnerViewArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);
