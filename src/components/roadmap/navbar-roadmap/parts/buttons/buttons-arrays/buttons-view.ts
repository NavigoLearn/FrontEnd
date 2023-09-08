// TODO buttons are: Hide progress, About
import { getIsEditing } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  enterEditingModeProtocol,
  saveEditingProtocol,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import { dispatchAnalyticsEvent } from '@store/misc/analytics';

export const buttonsPublicVisitor = [
  {
    name: 'Hide progress',
    callback: () => {},
  },
  {
    name: 'About',
    callback: () => {},
  },
];

// TODO buttons are :Edit, About, Hide progress, Unpublish, Delete
export const buttonsPublicOwner = [
  {
    name: 'Edit',
    callback: () => {
      enterEditingModeProtocol();
    },
  },
  {
    name: 'About',
    callback: () => {},
  },
  {
    name: 'Hide progress',
    callback: () => {},
  },
  {
    name: 'Unpublish',
    callback: () => {},
  },
  {
    name: 'Delete',
    callback: () => {},
  },
];

// TODO buttons are: Login, Signup, About
export const buttonsPublicAnonymus = [
  {
    name: 'Login',
    callback: () => {},
  },
  {
    name: 'Signup',
    callback: () => {},
  },
  {
    name: 'About',
    callback: () => {},
  },
];
