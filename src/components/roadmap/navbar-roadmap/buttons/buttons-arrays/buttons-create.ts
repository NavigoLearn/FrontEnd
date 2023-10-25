import {
  type IButtonsRoadmapNavbarOptions,
  requestButton,
} from '@components/roadmap/navbar-roadmap/buttons/buttons-arrays/buttons-requester.ts';

export const buttonsCreateAnonymusArray: IButtonsRoadmapNavbarOptions[] = [
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
  'about',
  'reset-roadmap',
];
export const buttonsCreateLogged = buttonsCreateLoggedArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);
