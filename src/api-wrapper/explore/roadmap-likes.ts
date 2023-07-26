import { errorHandlerDecorator } from '@src/typescript/error-handler';

export const likeCardFetch = errorHandlerDecorator(
  async (id: string): Promise<boolean> => {
    const fetchSource = `/api/roadmaps/${id}/like`;
    const response = await fetch(fetchSource, {
      method: 'GET',
      credentials: 'include',
    });
    return response.status === 200;
  }
);

export const unlikeCardFetch = errorHandlerDecorator(
  async (id: string): Promise<boolean> => {
    const fetchSource = `/api/roadmaps/${id}/like`;
    const res = await fetch(fetchSource, {
      method: 'DELETE',
      credentials: 'include',
    });
    return res.status === 200;
  }
);
