export class Actions {
  possibleActions: {
    // when adding new attachments that make actions available, they appear here
    [key: string]: () => void;
  };

  onClick: () => void;

  onHover: () => void;

  addAction(type: string, element: any, action: () => void): void {
    this.possibleActions[`${type} - ${element.name}`] = action;
  }
}

export const a = 1;
