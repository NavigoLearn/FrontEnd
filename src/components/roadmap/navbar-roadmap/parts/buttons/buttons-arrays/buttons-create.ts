import {
  IButtonsRoadmapNavbarOptions,
  requestButton,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-requester';

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
