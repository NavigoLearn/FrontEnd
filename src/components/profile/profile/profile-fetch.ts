import { errorHandlerDecorator } from '@src/typescript/error-handler';
import {
  CardRoadmapTypeApi,
  RoadmapTypeApiExplore,
} from '@src/types/explore/card';

export const fetchRoadmapCardsProfile = errorHandlerDecorator(
  async (id: string): Promise<any> => {
    // fetches from the api the cards
    const fetchRoute = `/api/users/${id}/roadmaps`;
    const response = await fetch(fetchRoute, {
      method: 'GET',
      credentials: 'include',
    });
    const dataJson: any = await response.json();
    return dataJson.data;
  }
);

export const fetchProfileData = errorHandlerDecorator(
  async (id: string): Promise<any> => {
    // fetches from the api the user's profile data
    const fetchRoute = `/api/users/${id}`;
    const response = await fetch(fetchRoute, {
      method: 'GET',
      credentials: 'include',
    });
    const dataJson: any = await response.json();
    return dataJson;
  }
);
