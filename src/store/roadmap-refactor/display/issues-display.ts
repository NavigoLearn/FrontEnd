import { atom } from 'nanostores';
import { type IssuePreview } from '@type/roadmap/old/tab-manager';
import { type IssueApiGet } from '@type/roadmap/old/Issues';
import { fetchIssues } from '@src/api-wrapper/roadmap/deprecated/issues';

const IssuesDisplay = atom({
  issues: [],
  displayedIssues: [],
} as {
  issues: IssuePreview[];
  displayedIssues: IssuePreview[];
});

export const setDisplayIssues = (issues: IssuePreview[]) => {
  const original = IssuesDisplay.get();
  IssuesDisplay.set({
    ...original,
    issues,
  });
};

export const getDisplayIssue = (id: string) => {
  const original = IssuesDisplay.get();
  const { issues } = original;
  return issues.find((issueVal) => issueVal.id === id);
};

export const setDisplayPage = (page: number, issuesPerPage: number) => {
  const original = IssuesDisplay.get();
  const { issues } = original;
  const displayedIssues = issues.slice(
    (page - 1) * issuesPerPage,
    page * issuesPerPage
  );
  IssuesDisplay.set({
    ...original,
    displayedIssues,
  });
};

export const getsIssuesAndSetsStore = async (roadmapId: string) => {
  const apiIssues: IssueApiGet[] = await fetchIssues(roadmapId);
  // transform APi issues into preview issues
  const issues: IssuePreview[] = apiIssues.map((issue) => {
    const { id, title, createdAt, content, userId, open } = issue;
    return {
      id,
      author: userId,
      authorId: userId,
      title,
      createdAt,
      open,
      profilePictureUrl: '',
      description: content,
    };
  });
  // fetches the mini profile for each author of issues
  const newIssues = [];
  await Promise.all(
    issues.map(async (issue) => {
      const response = await fetch(`/api/users/${issue.author}/mini`);
      const responseData = await response.json();
      const newIssue = issue as IssuePreview;
      newIssue.author = responseData.name;
      newIssue.profilePictureUrl = responseData.profilePictureUrl;
      newIssues.push(newIssue);
    })
  );
  // sets the store
  setDisplayIssues(newIssues);
};

export default IssuesDisplay;
