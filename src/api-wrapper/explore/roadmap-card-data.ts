import {
  CardTypeApiResponse,
  CardTypeApiResponseExplore,
  RoadmapTypeApiExplore,
} from '@type/explore/card';
import { errorHandlerDecorator } from '@src/typescript/error-handler';

export const fetchDefaultCardsExplore = errorHandlerDecorator(
  async (query: string, page: number): Promise<CardTypeApiResponseExplore> => {
    let fetchRouteExplore;
    if (query !== '') {
      fetchRouteExplore = `api/explore/?query=${query}&count=12&page=${page}`;
    } else {
      fetchRouteExplore = `api/explore/?count=12&page=${page}`;
    }
    const responseExplore = await fetch(fetchRouteExplore, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res);
    return await responseExplore.json();
  }
);

export const fetchRoadmapCardsProfile = errorHandlerDecorator(
  async (id: string): Promise<RoadmapTypeApiExplore[]> => {
    // fetches from the api the cards
    const fetchRoute = `/api/users/${id}/roadmaps`;
    const response = await fetch(fetchRoute, {
      method: 'GET',
      credentials: 'include',
    });
    const dataJson: CardTypeApiResponse = await response.json();
    return dataJson.roadmaps;
  }
);
