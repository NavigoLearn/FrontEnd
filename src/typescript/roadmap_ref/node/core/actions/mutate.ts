import { ActionsClass } from '@src/typescript/roadmap_ref/node/core/actions/core';

export function mutateActionLink(actions: ActionsClass, link: string) {
  actions.additionalData.link = link;
}
