import React, { useEffect, useState } from 'react';
import UpvoteSvg from '@components/explore/UI/shared/cards/components/UpvoteSvg';
import {
  fetchDislikeCard,
  fetchLikeCard,
  fetchRemoveLike,
} from '@src/api-wrapper/explore/roadmap-likes';
import { getUserStatus } from '@store/user/user-status';

type IUpvoteDownvoteProps = {
  upvotes: number;
  voteState: 'upvote' | 'downvote' | 'none';
  roadmapId: number;
};
const UpvoteDownvote = ({
  upvotes,
  voteState,
  roadmapId,
}: IUpvoteDownvoteProps) => {
  const [loaded, setLoaded] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [votes, setVotes] = useState(upvotes);

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
    if (!loaded) {
      setFromVoteState();
    }
  }, []);

  function handleVote() {
    if (getUserStatus().isLogged === false) return (location.href = '/login');

    if (!upvote && !downvote) {
      setVotes(upvotes);
      fetchRemoveLike(roadmapId)
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
      setVotes(upvotes + 1);
      fetchLikeCard(roadmapId)
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
      setVotes(upvotes - 1);
      fetchDislikeCard(roadmapId)
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
      throw new Error('Invalid vote state');
    }
  }
  useEffect(() => {
    if (loaded) handleVote();
  }, [upvote, downvote]);

  return (
    <div className='flex items-center'>
      <UpvoteSvg
        size={20}
        voted={upvote}
        upvote
        callback={() => {
          setLoaded(true);

          if (downvote) {
            setDownvote(false);
          }
          setUpvote((prev) => !prev);

          setVotes(upvotes + (upvote ? 0 : 1));
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

      <span className='text-darkBlue text-sm font-roboto-text ml-2'>
        {votes}
      </span>
    </div>
  );
};

export default UpvoteDownvote;
