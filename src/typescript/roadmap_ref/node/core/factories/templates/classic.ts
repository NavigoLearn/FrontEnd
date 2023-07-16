import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
// import { appendComponentTitle } from '@typescript/roadmap_ref/node/core/roadmap-data-mutation/append';
import {
  injectClassicData,
  injectClassicFlags,
} from '@typescript/roadmap_ref/node/core/factories/injectors/inject';
import {
  appendAttachmentJSON,
  appendComponentJSON,
} from '@typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryComponentJSONEmpty } from '@typescript/roadmap_ref/node/components/text/factories';
import { factoryEmptyAttachmentJSON } from '@typescript/roadmap_ref/node/attachments/tab/factory';

export function classicNodeFactoryBoilerplate(): NodeClass {
  // return boilerplate class for classic nodes and the most common
  const node = new NodeClass();
  // classic nodes has a tab-attachment attachment and the default color scheme
  injectClassicFlags(node);
  injectClassicData(node, 'someparent', []);
  appendComponentJSON(node, factoryComponentJSONEmpty('Title'));
  appendAttachmentJSON(node, factoryEmptyAttachmentJSON('Tab'));

  return node;
}
