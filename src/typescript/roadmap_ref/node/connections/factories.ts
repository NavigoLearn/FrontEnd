import { Connection } from '@src/typescript/roadmap_ref/node/connections/core';

export const factoryConnectionBasic = (from: string, to: string) => {
  const connection = new Connection(from, to);
  return connection;
};
