export type IActionTypes = 'Do nothing' | 'Open link' | 'Open Tab';

export class Actions {
  possibleActions: IActionTypes[] = ['Do nothing', 'Open link'];

  onClick: IActionTypes = 'Do nothing';

  onHover: IActionTypes = 'Do nothing';

  addAction(type: string, element: any, action: () => void): void {
    this.possibleActions[`${type} - ${element.name}`] = action;
  }
}
