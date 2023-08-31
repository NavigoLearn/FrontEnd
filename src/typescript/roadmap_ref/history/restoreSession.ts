import { hashData } from '@src/typescript/utils/hashData';
import {
  setRoadmapFromRecovery,
} from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import {
  getRoadmapId,
  getRoadmapState,
  IRoadmapState,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import {
  getRoadmapEdit,
} from '@store/roadmap-refactor/roadmap-data/roadmap-edit';

export type SaveItem = {
  data: IRoadmap;
  state: IRoadmapState;
  id: string;
}

const maxVersionHistory = 3;

export async function saveSession() {
  const data = getRoadmapEdit();
  const state = getRoadmapState();
  const id = getRoadmapState() === 'create' ? 'create' : getRoadmapId();
  const saveItem: SaveItem = {
    data,
    state,
    id,
  };
  // convert to json
  const roadmapData = JSON.stringify(saveItem);
  // hash the json
  const hash = await hashData(roadmapData);

  // get the current version history
  const versionHistory = localStorage.getItem(`${id}-roadmapVersionHistory`);
  // if there is no version history, create one
  if (versionHistory === null) {
    localStorage.setItem(`${id}-roadmapVersionHistory`, JSON.stringify([ hash ]));
    localStorage.setItem(hash, roadmapData);
    return;
  }

  // if there is a version history, parse it
  const parsedVersionHistory = JSON.parse(versionHistory);
  // add the new hash to the version history
  parsedVersionHistory.push(hash);
  // if parsedVersionHistory is larger than maxVersionHistory, remove the oldest version
  if (parsedVersionHistory.length > maxVersionHistory) {
    const version = parsedVersionHistory.shift();
    localStorage.removeItem(version);
  }
  // save the new version history
  localStorage.setItem(`${id}-roadmapVersionHistory`, JSON.stringify(parsedVersionHistory));
  // save the new roadmap data
  localStorage.setItem(hash, roadmapData);
}

export async function restoreSession() {
  // get the current roadmap id
  const id = getRoadmapState() === 'create' ? 'create' : getRoadmapId();
  // get the current version history
  const versionHistory = localStorage.getItem(`${id}-roadmapVersionHistory`);
  // if there is no version history, return
  if (versionHistory === null) {
    return null;
  }

  // if there is a version history, parse it
  const parsedVersionHistory = JSON.parse(versionHistory);
  // if there is no version history, return
  if (parsedVersionHistory.length === 0) {
    return null;
  }

  // get the last hash
  const lastHash = parsedVersionHistory[parsedVersionHistory.length - 1];
  // get the data from the last hash
  const lastData = localStorage.getItem(lastHash);
  // if there is no data, return
  if (lastData === null) {
    return null;
  }

  // hash the data
  const hash = await hashData(lastData);

  // if the current hash is not the same as the last hash, restore the last version
  if (hash !== lastHash) {
    // remove the current hash from the version history
    parsedVersionHistory.pop();

    // try next version
    return restoreSession();
  }

  setRoadmapFromRecovery(JSON.parse(lastData) as SaveItem);
}

export function clearSession() {
  // get the current roadmap id
  const id = getRoadmapState() === 'create' ? 'create' : getRoadmapId();

  // get the current version history
  const versionHistory = localStorage.getItem(`${id}-roadmapVersionHistory`);
  // if there is no version history, return
  if (versionHistory === null) {
    return null;
  }

  // if there is a version history, parse it
  const parsedVersionHistory = JSON.parse(versionHistory);

  // remove all versions
  parsedVersionHistory.forEach((hash: string) => {
    localStorage.removeItem(hash);
  });

  // remove the version history
  localStorage.removeItem(`${id}-roadmapVersionHistory`);
}

export function checkIfSessionExists() {
  const id = getRoadmapState() === 'create' ? 'create' : getRoadmapId();
  const versionHistory = localStorage.getItem(`${id}-roadmapVersionHistory`);
  if (versionHistory === null) {
    return false;
  }

  const parsedVersionHistory = JSON.parse(versionHistory);
  return parsedVersionHistory.length !== 0;
}