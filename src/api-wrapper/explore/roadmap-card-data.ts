import { errorHandlerDecorator } from '@src/typescript/error-handler';
import { CardRoadmapTypeApi, RoadmapTypeApiExplore } from '@type/explore/card';
import { ISearchParams } from '@components/explore/stores/explore-query-store';

function parameterBuilder(params: ISearchParams) {
  let result = '?';
  let paramCount = 0;
  const { query } = params;
  if (query !== '') {
    result += `query=${encodeURI(query).replace(/#/g, '%23')}`;
    paramCount += 1;
  }

  if (paramCount > 0) {
    result += '&';
  }

  if (params.topic !== 'All') {
    result += `topic=${params.topic.toLowerCase()}`;
    paramCount += 1;
  }

  if (paramCount > 0) {
    result += '&';
  }

  result += `sortBy=${params.sortBy.toLowerCase()}:DESC`;
  result += `&limit=${params.perPage}`;
  result += `&page=${params.page}`;

  return result;
}

export const fetchRoadmapCardsExplore = errorHandlerDecorator(
  async (params: ISearchParams): Promise<RoadmapTypeApiExplore> => {
    const fetchRouteExplore = `/api/search/roadmaps${parameterBuilder(params)}`;
    const responseExplore = await fetch(fetchRouteExplore, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res);
    return await responseExplore.json();
  }
);

export const fetchRoadmapCardsProfile = errorHandlerDecorator(
  async (id: string): Promise<CardRoadmapTypeApi[]> => {
    // fetches from the api the cards
    const fetchRoute = `/api/users/${id}/roadmaps`;
    const response = await fetch(fetchRoute, {
      method: 'GET',
      credentials: 'include',
    });
    const dataJson: RoadmapTypeApiExplore = await response.json();
    return dataJson.data;
  }
);
