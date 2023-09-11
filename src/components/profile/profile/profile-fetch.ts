import { errorHandlerDecorator } from '@src/typescript/error-handler';

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
    return await response.json();
  }
);

export const fetchPostProfileData = errorHandlerDecorator(
  async (
    name: string,
    githubUrl: string,
    websiteUrl: string,
    bio: string
  ): Promise<any> => {
    // fetches from the api the user's profile data
    console.log(name);
    console.log(githubUrl);
    console.log(websiteUrl);
    console.log(bio);
    const fetchRoute = `/api/users`;
    const response = await fetch(fetchRoute, {
      method: 'POST',
      body: JSON.stringify({
        name,
        githubUrl,
        websiteUrl,
        bio,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const dataJson: any = await response.json();
    console.log(dataJson);
    return dataJson;
  }
);
