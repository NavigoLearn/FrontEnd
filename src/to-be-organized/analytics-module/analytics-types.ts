import { AnalyticsBrowser } from '@segment/analytics-next';

export type IEventTypes = 'pageView' | 'roadmapInteraction' | 'authInteraction';

export type IVisitPages = 'roadmap' | 'profile' | 'home' | 'explore';
type IVisitPagePayload = {
  page: IVisitPages;
};

type IRoadmapInteraction = {
  actionType: 'marked-node' | 'clicked-node';
};

type IAuthInteraction = {
  actionType: 'github-auth' | 'google-auth' | 'logout';
};

export type IDataPayloads = {
  pageView: IVisitPagePayload;
  roadmapInteraction: IRoadmapInteraction;
  authInteraction: IAuthInteraction;
};

export type IEventPayload<T extends IEventTypes> = {
  type: T;
  data: IDataPayloads[T];
};

export type IEventMapper = {
  [key in IEventTypes]: (
    analytics: AnalyticsBrowser,
    event: IEventPayload<IEventTypes>
  ) => void;
};

export function checkIsEventAuthInteraction(
  props: any
): props is IEventPayload<'authInteraction'> {
  return props.type === 'authInteraction';
}

export function checkIsEventRoadmapInteraction(
  props: any
): props is IEventPayload<'roadmapInteraction'> {
  return props.type === 'roadmapInteraction';
}
export function checkIsEventPageView(
  props: any
): props is IEventPayload<'pageView'> {
  return props.type === 'pageView';
}
