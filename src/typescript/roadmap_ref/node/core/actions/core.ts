export type IActionTypes = 'Do nothing' | 'Open link' | 'Open attachment';
export type IAdditionalDataKeys = 'link';
export interface IAdditionalDataFields {
  link: string;
}

export type IAdditionalData = {
  [key in IAdditionalDataKeys]: IAdditionalDataFields[key];
};
export class ActionsClass {
  possibleActions: IActionTypes[] = ['Do nothing', 'Open link'];

  onClick: IActionTypes = 'Do nothing';

  onHover: IActionTypes = 'Do nothing';

  // @ts-ignore
  additionalData: IAdditionalData = {
    link: '',
  };
}
