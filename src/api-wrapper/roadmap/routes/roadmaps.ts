import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { errorHandlerDecorator } from '@src/typescript/error-handler';
import { storeRoadmapPostPayload } from '@src/api-wrapper/roadmap/stores/roadmap-payload';

export const fetchRoadmap = async (id: string) => {
  // fetches roadmapData from api
  const response = await fetch(`/api/roadmaps/${id}`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json());
  // decodes the roadmap-roadmap-data field from base64 to json
  response.data = JSON.parse(atob(response.data));
  return response;
};

export const updateRoadmapData = async (roadmap: IRoadmap) => {
  // posts roadmapData to api
  const { id } = roadmapStateStore.get();
  const response = await fetch(`/api/roadmaps/${id}/data`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      data: btoa(JSON.stringify(roadmap)),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  // posts all the editor-pages created in cache
  return response.json();
};

export const postRoadmapData = errorHandlerDecorator(async () => {
  const newRoadmap = storeRoadmapPostPayload.get();

  console.log('newRoadmap', newRoadmap);

  const response = await fetch('/api/roadmaps/create', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      ...newRoadmap,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseJson = await response.json();

  return responseJson;
});

export const deleteRoadmap = async (id: string) => {
  // deletes roadmapData from api
  const response = await fetch(`/api/roadmaps/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((res) => res);
  return response.json();
};

export const fetchRoadmapMiniById = async (id: string) => {
  // fetches roadmapData from api
  const response = await fetch(`/api/roadmaps/${id}/mini`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json());
  return response;
};
