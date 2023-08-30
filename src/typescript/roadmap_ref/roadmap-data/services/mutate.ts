import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';

export function mutateConnectionsIds(
  connections: ConnectionClass[],
  oldId: string,
  newId: string
) {
  connections.forEach((connection) => {
    if (connection.from === oldId) connection.from = newId;
    if (connection.to === oldId) connection.to = newId;
  });
}
