import {
  replaceRoadmapPostPayloadMissingWithDefaults,
  setPostRoadmapPayloadFromExistingStores,
  setPostRoadmapPostPayloadIsDraft,
  setPostRoadmapPostPayloadIsNotBanned,
  validateRoadmapPostPayload,
} from '@src/api-wrapper/roadmap/stores/roadmap-payload';
import { postRoadmapData } from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import { setRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

export async function publishRoadmapProtocol(isDraft: boolean) {
  // sending the roadmap to be created

  setPostRoadmapPayloadFromExistingStores();
  setPostRoadmapPostPayloadIsDraft(isDraft);
  setPostRoadmapPostPayloadIsNotBanned(true);
  replaceRoadmapPostPayloadMissingWithDefaults();
  validateRoadmapPostPayload();

  await postRoadmapData().then((roadmapId) => {
    setRoadmapId(roadmapId.id);
  });
  window.location.href = '/explore';
}
