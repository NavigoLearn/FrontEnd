import React, { useEffect, useState } from 'react';
import UpvoteSvg
  from '@components/explore/UI/shared/cards/components/UpvoteSvg';
import {
  dislikeCardFetch,
  likeCardFetch,
  removeRatingCardFetch,
} from '@src/api-wrapper/explore/roadmap-likes';
import { getUserStatus } from '@store/user/user-status';

type IUpvoteDownvoteProps = {
  upvotes: number;
  voteState: 'upvote' | 'downvote' | 'none';
  roadmapId: number;
};
const UpvoteDownvote = ({ upvotes, voteState, roadmapId }: IUpvoteDownvoteProps) => {
  const [ loaded, setLoaded ] = useState(false);
  const [ upvote, setUpvote ] = useState(false);
  const [ downvote, setDownvote ] = useState(false);
  const [ votes, setVotes ] = useState(upvotes);

  function setFromVoteState() {
    if (voteState === 'upvote') {
      setDownvote(false);
      setUpvote(true);
      setVotes(upvotes + 1);
    } else if (voteState === 'downvote') {
      setDownvote(true);
      setUpvote(false);
      setVotes(upvotes - 1);
    } else {
      setDownvote(false);
      setUpvote(false);
    }
  }

  useEffect(() => {
    if(!loaded) {
      setFromVoteState();
      return;
    }
  }, []);

  useEffect(() => {
    if (loaded) handleVote();
  }, [upvote, downvote]);

  function handleVote() {
    if(getUserStatus().isLogged === false)
      return location.href = '/login';

    if(!upvote && !downvote) {

      setVotes(upvotes);
      removeRatingCardFetch(roadmapId)
        .catch((err) => {
          console.log(err);
          setFromVoteState();
        })
        .then((res) => {
          if (!res) return;

          upvotes = votes;
          voteState = 'none';
        });
    } else if (upvote) {
      setVotes(upvotes + 1)
      likeCardFetch(roadmapId)
        .catch((err) => {
          console.log(err);
          setFromVoteState();
        })
        .then((res) => {
          if (!res) return;

          upvotes = votes;
          voteState = 'upvote';
        });
    } else if (downvote) {
      setVotes(upvotes - 1)
      dislikeCardFetch(roadmapId)
        .catch((err) => {
          console.log(err);
          setFromVoteState();
        })
        .then((res) => {
          if (!res) return;

          upvotes = votes;
          voteState = 'downvote';
        });
    } else {
      console.log('error in handle vote');
    }
  }

  return (
    <div className="flex items-center">
      <UpvoteSvg
        size={20}
        voted={upvote}
        upvote={true}
        callback={() => {
          setLoaded(true);

          if (downvote) {
            setDownvote(false);
          }
          setUpvote((prev) => !prev);

          setVotes(upvotes + (upvote ? 0 : 1))
        }}
      />
      <UpvoteSvg
        size={20}
        voted={downvote}
        upvote={false}
        callback={() => {
          setLoaded(true);

          if (upvote) {
            setUpvote(false);
          }

          setDownvote((prev) => !prev);
        }}
      />

      <span className="text-darkBlue text-sm font-roboto-text ml-2">
        {votes}
      </span>
    </div>
  );
};

export default UpvoteDownvote;
