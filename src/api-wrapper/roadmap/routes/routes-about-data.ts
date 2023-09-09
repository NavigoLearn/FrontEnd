import { getRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  getRoadmapAbout,
  getRoadmapId,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import {
  ITopicOptions,
  ITopicParam,
} from '@components/explore/stores/explore-query-store';

export const fetchUpdateRoadmapAboutMiscData = async (miscData: string) => {
  const id = getRoadmapId();
  const response = await fetch(`/api/roadmaps/${id}/misc-data`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      miscData: btoa(miscData),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  return response.json();
};

export const fetchUpdateRoadmapAboutFields = async (
  title: string,
  description: string,
  miscData: string,
  topic: ITopicOptions
) => {
  const id = getRoadmapId();

  const response = await fetch(`/api/roadmaps/${id}/about`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      name: title,
      description,
      topic,
      miscData,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  const responseJson = await response.json();
  console.log('responseJson', responseJson);
  return responseJson;
};

export const fetchUpdateRoadmapAboutDescription = async (
  newDescription: string
) => {
  const id = getRoadmapId();

  console.log('newDescription', newDescription, id);
  const response = await fetch(`/api/roadmaps/${id}/description`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      description: newDescription,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  return response.json();
};

export const fetchUpdateRoadmapAboutTitle = async (newTitle: string) => {
  const id = getRoadmapId();
  const response = await fetch(`/api/roadmaps/${id}/title`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      name: newTitle,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  return response.json();
};

export const fetchUpdateRoadmapAboutData = async () => {
  // posts roadmapData to api
  const id = getRoadmapId();
  const response = await fetch(`/api/roadmaps/${id}/data`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  // posts all the editor-pages created in cache
  return response.json();
};

export const fetchUpdateRoadmapAboutProtocol = async () => {
  const { name: title, description, roadmapId } = getRoadmapAbout();
  const roadmap = getRoadmapSelector();
  const { data } = roadmap;
  const miscData = btoa(JSON.stringify(data));

  if (roadmapId === null) throw new Error('roadmapId is undefined');
  if (title === null) throw new Error('title is undefined');
  if (description === null) throw new Error('description is undefined');
  if (roadmap === null) throw new Error('roadmap data is undefined');
  if (data === null) throw new Error('data is undefined');

  await fetchUpdateRoadmapAboutFields(
    title,
    description,
    miscData,
    'programming'
  );

  return {
    message: 'success',
    success: true,
  };
};
