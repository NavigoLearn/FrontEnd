export interface HashMap<T> {
  [key: string]: T;
}

export type HashMapWithKeys<R extends string, T> = {
  [key in R]: T;
};
