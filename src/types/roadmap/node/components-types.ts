import {
  DescriptionComponent,
  TitleComponent,
} from '@typescript/roadmap_ref/node/components/text/core';

export type IComponentsOptions = 'Title' | 'Description';

export type IComponentsObject =
  | {
      type: 'Title';
      component: TitleComponent;
    }
  | {
      type: 'Description';
      component: DescriptionComponent;
    }
  | {
      type: 'ultra mega fine component';
      component: {
        cevaaa: number;
      };
    };
