import { Roadmap } from '@type/roadmap/stores/roadmap';
import roadmapState from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import aboutTabStore from '@store/roadmap-refactor/roadmap-data/about';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

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

type BackendRoadmapFormat = {
  name: string;
  description: string;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
  data: string; // base64 encoded json
};
export const updateRoadmapData = async (roadmap: Roadmap) => {
  // posts roadmapData to api
  const { id } = roadmapState.get();
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

export const postRoadmapData = async (roadmap: Roadmap) => {
  // posts roadmapData to api
  const newRoadmap: BackendRoadmapFormat = {
    name: aboutTabStore.get().name,
    description: aboutTabStore.get().description,
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data: btoa(JSON.stringify(roadmap)),
  };
  console.log(newRoadmap);
  console.log(deepCopy(roadmap));

  const response = await fetch('/api/roadmaps/create', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      roadmap: newRoadmap,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

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
