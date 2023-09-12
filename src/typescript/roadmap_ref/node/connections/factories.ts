import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';

export const factoryConnectionBoilerplate = (from: string, to: string) => {
  const connection = new ConnectionClass(from, to);
  return connection;
};
