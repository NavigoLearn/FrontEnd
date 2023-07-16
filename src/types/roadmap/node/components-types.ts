import {
  ComponentDescription,
  ComponentTitle,
} from '@typescript/roadmap_ref/node/components/text/core';
import { IIdentifiers } from '@type/roadmap/node/core-types';

export type IComponentOptions = 'Title' | 'Description';

export type IComponentObject = IIdentifiers &
  (
    | {
        type: 'Title';
        component: ComponentTitle;
      }
    | {
        type: 'Description';
        component: ComponentDescription;
      }
    | {
        type: 'ultra mega fine component';
        component: {
          cevaaa: number;
        };
      }
  );
