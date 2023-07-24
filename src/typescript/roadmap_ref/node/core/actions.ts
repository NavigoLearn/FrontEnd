export type IAction = {
  name: string;
  action: () => void;
};
export class Actions {
  possibleActions: {
    // when adding new attachments that make actions available, they appear here
    [key: string]: () => void;
  } = {
    'Open Tab': () => {},
    'Open Link': () => {},
    'Do nothing': () => {},
  };

  onClick: IAction = {
    name: 'Do nothing',
    action: () => {},
  };

  onHover: IAction = {
    name: 'Do nothing',
    action: () => {},
  };

  addAction(type: string, element: any, action: () => void): void {
    this.possibleActions[`${type} - ${element.name}`] = action;
  }
}

export const a = 1;
