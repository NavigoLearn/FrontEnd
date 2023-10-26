import {
  requestButton,
  type IButtonsRoadmapNavbarOptions,
} from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';

const buttonEditingRoadmapArray: IButtonsRoadmapNavbarOptions[] = [
  'save-changes',
  'cancel-changes',
];
export const buttonsEditingRoadmap = buttonEditingRoadmapArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);
