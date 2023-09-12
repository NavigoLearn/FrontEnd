import { errorHandlerDecorator } from '@src/typescript/error-handler';

export const fetchLikeCard = errorHandlerDecorator(
  async (id: number): Promise<boolean> => {
    const fetchSource = `/api/roadmaps/${id}/like`;
    const response = await fetch(fetchSource, {
      method: 'GET',
      credentials: 'include',
    });
    return response.status === 200;
  }
);

export const fetchDislikeCard = errorHandlerDecorator(
  async (id: number): Promise<boolean> => {
    const fetchSource = `/api/roadmaps/${id}/dislike`;
    const response = await fetch(fetchSource, {
      method: 'GET',
      credentials: 'include',
    });
    return response.status === 200;
  }
);

export const fetchRemoveLike = errorHandlerDecorator(
  async (id: number): Promise<boolean> => {
    const fetchSource = `/api/roadmaps/${id}/like`;
    const res = await fetch(fetchSource, {
      method: 'DELETE',
      credentials: 'include',
    });
    return res.status === 200;
  }
);
