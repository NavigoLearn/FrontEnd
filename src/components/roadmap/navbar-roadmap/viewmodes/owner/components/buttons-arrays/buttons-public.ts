import {
  requestButton,
  type IButtonsRoadmapNavbarOptions,
} from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';

const buttonsPublicOwnerArray: IButtonsRoadmapNavbarOptions[] = [
  'edit',
  'convert-to-draft',
  'delete',
];

export const buttonsPublicOwnerView = buttonsPublicOwnerArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);
