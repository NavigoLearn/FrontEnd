import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import { parseDomain, ParseResultType } from 'parse-domain';

const safeUrlDomains = [
  'cs.fyi',
  'github.com',
  'mozilla.org',
  'navigolearn.com',
  'roadmap.sh',
  'wikipedia.org',
  'youtu.be',
  'youtube.com',
];

export function getDomainFromUrl(url: string) {
  const urlObj = new URL(url);

  const parsedDomain = parseDomain(urlObj.hostname);

  if (parsedDomain.type === ParseResultType.Listed) {
    return `${parsedDomain.domain}.${parsedDomain.topLevelDomains.join('.')}`;
  }

  return urlObj.hostname;
}

export function isSafeUrl(url: string) {
  const domain = getDomainFromUrl(url);
  return safeUrlDomains.includes(domain);
}

export function openRoadmapLink(url: string) {
  if (!isSafeUrl(url)) setDisplayPageTypeFullScreen('unsafe-link', url);
  else window.open(url, '_blank');
}
