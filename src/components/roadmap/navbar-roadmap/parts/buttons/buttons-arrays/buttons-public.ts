import {
  requestButton,
  type IButtonsRoadmapNavbarOptions,
} from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-arrays/buttons-requester';

const buttonsPublicLoggedVisitorArray: IButtonsRoadmapNavbarOptions[] = [
  'hide-progress',
  'about',
];
export const buttonsPublicLoggedVisitor = buttonsPublicLoggedVisitorArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);

const buttonsPublicOwnerArray: IButtonsRoadmapNavbarOptions[] = [
  'edit',
  'about',
  'hide-progress',
  'convert-to-draft',
  'delete',
];
export const buttonsPublicOwnerView = buttonsPublicOwnerArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);

const buttonsPublicAnonymusArray: IButtonsRoadmapNavbarOptions[] = [
  'get-started',
  'about',
];
export const buttonsPublicAnonymus = buttonsPublicAnonymusArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);

const buttonsPublicOwnerEditArray: IButtonsRoadmapNavbarOptions[] = [
  'save-changes',
  'cancel-changes',
];
export const buttonsPublicOwnerEdit = buttonsPublicOwnerEditArray.map(
  (buttonType) => {
    return requestButton(buttonType);
  }
);
