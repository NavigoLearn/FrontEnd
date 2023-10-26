import {
  type IButtonsRoadmapNavbarOptions,
  requestButton,
} from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';

const buttonsCreateAnonymusArray: IButtonsRoadmapNavbarOptions[] = [
  'get-started',
  'reset-roadmap',
];
export const buttonsCreateAnonymus = buttonsCreateAnonymusArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);

const buttonsCreateLoggedArray: IButtonsRoadmapNavbarOptions[] = [
  'publish',
  'save-as-draft',
  'reset-roadmap',
];
export const buttonsCreateLogged = buttonsCreateLoggedArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);
