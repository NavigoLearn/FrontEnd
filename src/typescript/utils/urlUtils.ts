import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import { parseDomain, ParseResultType } from 'parse-domain';

const safeUrlDomains = [
  'cs.fyi',
  'freecodecamp.org',
  'github.com',
  'google.com',
  'mozilla.org',
  'navigolearn.com',
  'roadmap.sh',
  'wikipedia.org',
  'youtu.be',
  'youtube.com',

  // learn x online org domains
  'learnpython.org',
  'learnjavaonline.org',
  'learn-html.org',
  'learn-golang.org',
  'learn-c.org',
  'learn-cpp.org',
  'learn-js.org',
  'learn-php.org',
  'learnshell.org',
  'learncs.org',
  'learn-perl.org',
  'learnrubyonline.org',
  'learnscala.org',
  'learnsqlonline.org',

  // javascript specific
  'javascript.com',
  'javascript.info',
  'learnjavascript.online',
  'javascript30.com',
  'reaal.me',

  // react specific
  'reactjs.org',
  'react.dev',
  'egghead.io',
  'react-tutorial.app',

  // PHP specific
  'php.net',
  'phptherightway.com',
  'phpdelusions.net',
  'phpapprentice.com',

  // SQL specific
  'sqlbolt.com',
  'sqlzoo.net',
  'sqltutorial.org',
  'sqlteaching.com',
  'sqlfiddle.com',
  'sql-ex.com',

  // Python specific
  'python.org',
  'pythonspot.com',
  'pythonprogramming.net',
  'pythonforbeginners.com',
  'python-course.eu',
  'pythoncentral.io',
  'pythoncheatsheet.org',
  'pythonforbiologists.com',
  'pythonforundergradengineers.com',
  'pythonforfinance.net',

  // games
  'flexboxfroggy.com',
  'codeabbey.com',
  'codingame.com',
  'hackerrank.com',
  'codewars.com',
  'exercism.org',
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
