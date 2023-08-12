import { factoryConnectionBoilerplate } from '@src/typescript/roadmap_ref/node/connections/factories';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export const factoryConnection = (
  startNode: NodeClass,
  endNode: NodeClass
): ConnectionClass => {
  const connection = factoryConnectionBoilerplate(startNode.id, endNode.id);
  startNode.connections.push(connection.id);
  endNode.connections.push(connection.id);
  return connection;
};
