import {
  type IssueApi,
  type IssueApiGet,
  type IssueCommentApiGet,
} from '@type/roadmap/old/Issues';
import { errorHandlerDecorator } from '@src/typescript/error-handler';

export const fetchPostNewIssue = errorHandlerDecorator(
  async (roadmapId: string, issue: IssueApi) => {
    const response = await fetch(`/api/roadmaps/${roadmapId}/issues/create`, {
      method: 'POST',
      body: JSON.stringify({
        issue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }
);

export const fetchIssue = errorHandlerDecorator(
  async (roadmapId: string, issueId: string) => {
    const response = await fetch(
      `/api/roadmaps/${roadmapId}/issues/${issueId}`
    );
    return response.json();
  }
);

export const fetchIssues = errorHandlerDecorator(
  async (roadmapId: string): Promise<IssueApiGet[]> => {
    const response = await fetch(`/api/roadmaps/${roadmapId}/issues`);
    const responseData = await response.json();
    return responseData.issues;
  }
);

export const fetchIssueComments = errorHandlerDecorator(
  async (
    roadmapId: string,
    issueId: string
  ): Promise<{ comments: IssueCommentApiGet[] }> => {
    const response = await fetch(
      `/api/roadmaps/${roadmapId}/issues/${issueId}/comments/`
    );
    return response.json();
  }
);

export const fetchPostNewComment = errorHandlerDecorator(
  async (roadmapId: string, issueId: string, content: string) => {
    const response = await fetch(
      `/api/roadmaps/${roadmapId}/issues/${issueId}/comments/create`,
      {
        method: 'POST',
        body: JSON.stringify({
          content,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.json();
  }
);

export const fetchDeleteComment = errorHandlerDecorator(
  async (roadmapId: string, issueId: string, commentId: string) => {
    const response = await fetch(
      `/api/roadmaps/${roadmapId}/issues/${issueId}/comments/${commentId}/`,
      {
        method: 'DELETE',
      }
    );
    return response.status === 200;
  }
);

export const fetchOpenIssue = errorHandlerDecorator(
  async (issueId: string, roadmapId: string) => {
    const response = await fetch(
      `/api/roadmaps/${roadmapId}/issues/${issueId}/status`,
      {
        method: 'GET',
      }
    );
    return response.status === 200;
  }
);

export const fetchCloseIssue = errorHandlerDecorator(
  async (issueId: string, roadmapId: string) => {
    const response = await fetch(
      `/api/roadmaps/${roadmapId}/issues/${issueId}/status`,
      {
        method: 'DELETE',
      }
    );
    return response.status === 200;
  }
);
