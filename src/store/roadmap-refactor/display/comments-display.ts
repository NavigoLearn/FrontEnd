import { atom } from 'nanostores';
import { type IssueComment } from '@type/roadmap/old/Issues';
import { processUserUrlPic } from '@src/typescript/user/misc';
import { fetchIssueComments } from '@src/api-wrapper/roadmap/deprecated/issues';
import { fetchGetMiniProfileDataById } from '@src/api-wrapper/user/routes-user';

const commentsDisplay = atom({
  comments: [],
} as {
  comments: IssueComment[];
});

export const setDisplayComments = (comments: IssueComment[]) => {
  const original = commentsDisplay.get();
  commentsDisplay.set({
    ...original,
    comments,
  });
};

export const emptyComments = () => {
  commentsDisplay.set({
    comments: [],
  });
};

export async function getCommentsAndSetDisplay(
  roadmapId: string,
  issueId: string
) {
  const { comments } = await fetchIssueComments(roadmapId, issueId);
  const newComments: IssueComment[] = [];

  const commentMap = {};
  await Promise.all(
    comments.map(async (comment): Promise<IssueComment> => {
      // fetch user mini for name and profile picture
      const userMini = await fetchGetMiniProfileDataById(comment.userId);
      const newComment: IssueComment = {
        id: comment.id,
        content: comment.content,
        date: comment.createdAt,
        profilePictureUrl: processUserUrlPic(userMini.profilePictureUrl),
        author: userMini.name,
        authorId: comment.userId,
      };
      commentMap[comment.id] = newComment;
      return newComment;
    })
  );

  comments.map((comment) => {
    newComments.push(commentMap[comment.id]);
  });
  // formats the comments from api to the format to normal format
  setDisplayComments(newComments);
}

export default commentsDisplay;
