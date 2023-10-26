import React, { useEffect, useState } from 'react';
import UpvoteSvg from '@components/explore/UI/shared/cards/components/UpvoteSvg';
import {
  fetchDislikeCard,
  fetchLikeCard,
  fetchRemoveLike,
} from '@src/api-wrapper/explore/roadmap-likes';
import { getUserStatus } from '@store/user/user-status';
import { setBasePopup } from '@components/shared/stores/store-base-popups.ts';
import { requestButton } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';

export type VoteState = 'upvote' | 'downvote' | 'none';

type IUpvoteDownvoteProps = {
  upvotes: number;
  voteState: VoteState;
  roadmapId: number;
  size?: number;
};
const UpvoteDownvote = ({
  upvotes,
  voteState,
  roadmapId,
  size,
}: IUpvoteDownvoteProps) => {
  const [loaded, setLoaded] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [votes, setVotes] = useState(upvotes);
  const loginButtonCallback = requestButton('get-started').callback;

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
    if (getUserStatus().isLogged === false) {
      loginButtonCallback();
      setFromVoteState();
      return;
    }

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
        size={size}
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
        size={size}
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

      <span className='text-darkBlue text-xs font-roboto-text ml-1'>
        {votes}
      </span>
    </div>
  );
};

UpvoteDownvote.defaultProps = {
  size: 20,
};

export default UpvoteDownvote;
