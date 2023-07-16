import React, { useEffect, useRef, useState } from 'react';
import { divWrapper } from '@components/roadmap/tabs/utils/logic';
import circledot from '@assets/circledot.svg';
import { useStore } from '@nanostores/react';
import displayManagerStore, {
  setIssues,
} from '@store/roadmap-refactor/display/display-manager';
import cross from '@assets/cross.svg';
import commentsDisplay, {
  getCommentsAndSetDisplay,
} from '@store/roadmap-refactor/display/comments-display';
import Comment from '@components/roadmap/tabs/thread/Comment';
import AddComment from '@components/roadmap/tabs/thread/AddComment';
import { getDisplayIssue } from '@store/roadmap-refactor/display/issues-display';
import roadmapState from '@store/roadmap/data/roadmap_state';

const Thread = () => {
  const { issueId } = useStore(displayManagerStore);
  const { comments } = useStore(commentsDisplay);
  const { id } = roadmapState.get();
  const [loaded, setLoaded] = useState(false);
  const [render, setRender] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const mobile = useRef(false);

  async function triggerRerender() {
    await getCommentsAndSetDisplay(id, issueId);
  }

  useEffect(() => {
    const issue = getDisplayIssue(issueId);
    setTitle(issue.title);
    setAuthor(issue.author);
    setDescription(issue.description);

    triggerRerender().then(() => {
      setLoaded(true);
    });
    if (window.innerWidth < 768) {
      mobile.current = true;
    }
  }, []);

  return (
    <div className='w-full h-full relative flex flex-col '>
      <div className='relative mt-6 w-full flex justify-center'>
        <div className=' font-kanit-text font-semibold text-xl md:text-3xl relative flex flex-col '>
          <div className=' w-full flex justify-center py-2 '>
            <img
              draggable='false'
              alt='img circledot'
              src={circledot}
              className='h-8 w-8'
            />
          </div>
          <div className='flex justify-center font-medium font-kanit-text '>
            {title}
          </div>
          <div className=' w-full flex justify-center gap-2 '>
            <div className='text-secondary text-base font-light'>
              by {author}
            </div>
            <div className='text-secondary text-base font-light'>
              #{issueId}
            </div>
          </div>

          <div className='flex justify-center items-center text-secondary text-lg my-4'>
            {description}
          </div>
        </div>
        <button
          type='button'
          className=' w-6 h-6 absolute left-10 top-2 '
          onClick={() => {
            // close tab-attachment
            setIssues();
          }}
        >
          <img
            draggable='false'
            alt='close tab issue'
            src={cross}
            className='w-6 h-6'
          />
        </button>
      </div>

      <div className='w-full grow overflow-auto'>
        {loaded &&
          comments.map((comment) => (
            <div key={comment.id}>
              {divWrapper(
                <Comment
                  date={comment.date}
                  urlPic={comment.profilePictureUrl}
                  author={comment.author}
                  authorId={comment.authorId}
                  id={comment.id}
                  issueId={issueId}
                  text={comment.content}
                  rerender={() => {
                    triggerRerender();
                  }}
                />
              )}
            </div>
          ))}
        {loaded && mobile.current && (
          <AddComment
            author={author}
            issueId={issueId}
            rerender={() => {
              triggerRerender();
            }}
          />
        )}
        {loaded &&
          !mobile.current &&
          divWrapper(
            <AddComment
              author={author}
              issueId={issueId}
              rerender={() => {
                triggerRerender();
              }}
            />
          )}
      </div>
    </div>
  );
};

export default Thread;
