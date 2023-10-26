import {
  replaceRoadmapPostPayloadMissingWithDefaults,
  setPostRoadmapPayloadFromExistingStores,
  setPostRoadmapPostPayloadIsDraft,
  setPostRoadmapPostPayloadIsNotBanned,
  validateRoadmapPostPayload,
} from '@src/api-wrapper/roadmap/stores/roadmap-payload.ts';
import { fetchPostRoadmapData } from '@src/api-wrapper/roadmap/routes/routes-roadmaps.ts';
import { setRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';

export async function publishRoadmapProtocol(isDraft: boolean) {
  // sending the roadmap to be created

  setPostRoadmapPayloadFromExistingStores();
  setPostRoadmapPostPayloadIsDraft(isDraft);
  setPostRoadmapPostPayloadIsNotBanned(true);
  replaceRoadmapPostPayloadMissingWithDefaults();
  validateRoadmapPostPayload();

  await fetchPostRoadmapData().then((roadmapId) => {
    setRoadmapId(roadmapId.id);
  });
  window.location.href = '/explore';
}
