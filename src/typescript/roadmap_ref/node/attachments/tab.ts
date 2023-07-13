import { ITabComponentProperties } from '@type/roadmap/node/tab-types';

export class TabComponent {
  componentProperties: ITabComponentProperties;

  constructor(componentProperties: ITabComponentProperties) {
    this.componentProperties = componentProperties;
  }
}

export class TabAttachment {
  components: TabComponent[] = [];
}
