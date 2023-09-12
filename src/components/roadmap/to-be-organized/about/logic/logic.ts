import { getRoadmapType } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import { fetchUpdateRoadmapAboutProtocol } from '@src/api-wrapper/roadmap/routes/routes-about-data';

export function postOnSaveAboutDataProtocol() {
  const type = getRoadmapType();
  if (type === 'create') {
    // does not post any data because the roadmap does not exist yet
  }
  if (type === 'public' || type === 'draft') {
    fetchUpdateRoadmapAboutProtocol();
  }
}
