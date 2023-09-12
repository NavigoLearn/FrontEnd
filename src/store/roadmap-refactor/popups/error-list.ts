import { atom } from 'nanostores';

export type Error = {
  id: string;
  message: string;
};

const errorList = atom({
  errors: [],
  errorUpTime: 3000,
} as {
  errors: Error[];
  errorUpTime: number;
});

export const removeError = (id: string) => {
  const original = errorList.get();
  errorList.set({
    ...original,
    errors: original.errors.filter((error) => error.id !== id),
  });
};

export const addNewError = (message: string) => {
  const original = errorList.get();
  const id = Date.now().toString();
  const newError = {
    id,
    message,
  };
  errorList.set({
    ...original,
    errors: [...original.errors, newError],
  });
  console.log('new error', newError);
  setTimeout(() => {
    removeError(id);
  }, original.errorUpTime);
};

export default errorList;
