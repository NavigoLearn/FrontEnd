import {
  TabInfo,
  TabInfoApi,
  TabInfoApiSendFormat,
} from '@type/roadmap/old/tab-manager';
import roadmapState from '@store/roadmap/data/roadmap_state';
import { errorHandlerDecorator } from '@src/typescript/error-handler';

export const fetchTabInfoData = errorHandlerDecorator(async (id: string) => {
  // uses fetch to get roadmap-roadmap-data from the server
  const roadmapId = roadmapState.get().id;
  const response = await fetch(`/api/roadmaps/${roadmapId}/tabsInfo/${id}`, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());
  const { tabInfo } = response;
  const decoded = JSON.parse(atob(tabInfo.content));
  console.log('got decoded tab-attachment');
  return decoded;
});

export const updateTabInfoData = errorHandlerDecorator(
  async (id: string, tabData: TabInfo) => {
    // uses fetch to post roadmap-roadmap-data on the server
    const roadmapId = roadmapState.get().id;
    // creates the API object
    const apiTabData: TabInfoApi = {
      stringId: tabData.id, // the id of the tab-attachment that is shared with the node
      roadmapId, // the id of the roadmap that is shared with the node
      // encoded json base64
      content: btoa(JSON.stringify(tabData)),
    };
    const sentData: TabInfoApiSendFormat = {
      tabInfo: apiTabData,
    };
    const response = await fetch(`/api/roadmaps/${roadmapId}/tabsInfo/${id}`, {
      method: 'POST',
      body: JSON.stringify(sentData),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => res);
    return response.json();
  }
);

export const createTabInfoData = errorHandlerDecorator(
  async (id: string, tabData: TabInfo) => {
    // uses fetch to post roadmap-roadmap-data on the server
    const roadmapId = roadmapState.get().id;
    // creates the API object
    const apiTabData: TabInfoApi = {
      stringId: tabData.id, // the id of the tab-attachment that is shared with the node
      roadmapId, // the id of the roadmap that is shared with the node
      // encoded json base64
      content: btoa(JSON.stringify(tabData)),
    };
    const sentData: TabInfoApiSendFormat = {
      tabInfo: apiTabData,
    };

    const response = await fetch(`/api/roadmaps/${roadmapId}/tabsInfo/create`, {
      method: 'POST',
      body: JSON.stringify(sentData),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => res);
    return response.json();
  }
);

export const fetchTabAbout = errorHandlerDecorator(
  async (roadmapId: string) => {
    const response = await fetch(`/roadmaps/${roadmapId}/mini`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res);
    const responseData = await response.json();
    return responseData;
  }
);

export const fetchRoadmapMiniById = errorHandlerDecorator(
  async (id: string) => {
    // fetches roadmapData from api
    const response = await fetch(`/api/roadmaps/${id}/mini`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
    return response;
  }
);

export const fetchPostTabAboutTitle = errorHandlerDecorator(
  async (roadmapId: string, title: string) => {
    const response = await fetch(`/api/roadmaps/${roadmapId}/title`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res);
    const responseData = await response.json();
    return responseData;
  }
);

export const fetchPostTabAboutDescription = errorHandlerDecorator(
  async (roadmapId: string, description: string) => {
    const response = await fetch(`/api/roadmaps/${roadmapId}/description`, {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res);
    const responseData = await response.json();

    return responseData;
  }
);
