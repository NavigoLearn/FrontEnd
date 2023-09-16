import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { errorHandlerDecorator } from '@src/typescript/error-handler';
import { storeRoadmapPostPayload } from '@src/api-wrapper/roadmap/stores/roadmap-payload';
import { getRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import { decodeBase64, encodeBase64 } from '@src/typescript/utils/misc';
import { IAttachmentTabStatus } from '@src/typescript/roadmap_ref/node/attachments/tab/core';

export const fetchRoadmap = async (id: string) => {
  // fetches roadmapData from api
  const response = await fetch(`/api/roadmaps/${id}`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json());
  // decodes the roadmap-roadmap-data field from base64 to json
  response.data = JSON.parse(decodeBase64(response.data));
  return response;
};

export const fetchUpdateRoadmapData = async (roadmap: IRoadmap) => {
  const id = getRoadmapId();
  if (!id) return; // on create page
  const response = await fetch(`/api/roadmaps/${id}/data`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      data: encodeBase64(JSON.stringify(roadmap)),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
  const responseData = await response.json();
  console.log('fetchUpdateRoadmapData', responseData);
  return responseData;
};

export const postRoadmapData = errorHandlerDecorator(async () => {
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

export const fetchRoadmapMiniById = async (id: string) => {
  // fetches roadmapData from api
  return await fetch(`/api/roadmaps/${id}/mini`, {
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
  responseData.data = JSON.parse(decodeBase64(responseData.data));
  return responseData;
};

export type IRoadmapProgress = Record<string, IAttachmentTabStatus>;
export const fetchUpdateRoadmapProgress = async (data: IRoadmapProgress) => {
  const id = getRoadmapId();
  const response = await fetch(`/api/roadmaps/${id}/progress`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      data: encodeBase64(JSON.stringify(data)),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
