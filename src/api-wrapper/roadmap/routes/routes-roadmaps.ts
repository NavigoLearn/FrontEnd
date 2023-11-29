import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { errorHandlerDecorator } from '@src/typescript/error-handler';
import { storeRoadmapPostPayload } from '@src/api-wrapper/roadmap/stores/roadmap-payload';
import { getRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import { type IAttachmentTabStatus } from '@src/typescript/roadmap_ref/node/attachments/tab/core';

export const fetchRoadmap = async (id: string) => {
  // fetches roadmapData from api
  return fetch(`/api/roadmaps/${id}`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json());
};

export const fetchUpdateRoadmapData = async (
  roadmap: IRoadmap
): Promise<unknown> => {
  const id = getRoadmapId();
  if (!id) return; // on create page

  return fetch(`/api/roadmaps/${id}/data`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      data: JSON.stringify(roadmap),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export const fetchPostRoadmapData = errorHandlerDecorator(async () => {
  const newRoadmap = storeRoadmapPostPayload.get();

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
  return await response.json();
});

export const fetchDeleteRoadmap = async () => {
  const id = getRoadmapId();
  const response = await fetch(`/api/roadmaps/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((res) => res);
  return response.json();
};

export const fetchRoadmapMiniById = async (id: string): Promise<unknown> => {
  // fetches roadmapData from api
  return fetch(`/api/roadmaps/${id}/mini`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json());
};

export const fetchUpdateRoadmapIsDraft = async (isDraft: boolean) => {
  const id = getRoadmapId();
  const response = await fetch(`/api/roadmaps/${id}/draft`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      isDraft,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  return response.json();
};

export const fetchUpdateRoadmapVersion = async (version: string) => {
  const id = getRoadmapId();
  const response = await fetch(`/api/roadmaps/${id}/version`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      version,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const fetchGetRoadmapProgress = async () => {
  const id = getRoadmapId();
  const response = await fetch(`/api/roadmaps/${id}/progress`, {
    method: 'GET',
    credentials: 'include',
  });
  const responseData = await response.json();
  if (responseData.success === false) return false;
  return responseData;
};

export type IRoadmapProgress = Record<string, IAttachmentTabStatus>;
export const fetchUpdateRoadmapProgress = async (data: IRoadmapProgress) => {
  const id = getRoadmapId();
  await fetch(`/api/roadmaps/${id}/progress`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      data: JSON.stringify(data),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
