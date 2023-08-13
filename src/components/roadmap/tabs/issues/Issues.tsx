import React, { useEffect, useState } from 'react';
import roadmapState from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { useStore } from '@nanostores/react';
import Button from '@components/roadmap/tabs/utils/Button';
import cross from '@assets/cross.svg';
import issuesDisplay, {
  getsIssuesAndSetsStore,
  setDisplayPage,
} from '@store/roadmap-refactor/display/issues-display';
import PageArrows from '@components/roadmap/tabs/issues/PageArrows';
import loggedUser from '@store/user/logged-user';
import Issue from './Issue';
import IssueButton from '../utils/IssueButton';
import { divWrapper } from '../utils/logic';

const Issues = () => {
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const { displayedIssues, issues } = useStore(issuesDisplay);
  const issuePerPage = 5;

  useEffect(() => {
    // fetches and caches all issues
    getsIssuesAndSetsStore(roadmapState.get().id).then(() => {
      setDisplayPage(page, issuePerPage);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    setDisplayPage(page, issuePerPage);
  }, [page]);

  return (
    <div className='w-full h-full  relative bg-white flex flex-col border-t-black border-t-0 md:border-t-0'>
      <div className='w-full  flex justify-center items-center px-8 mt-6 flex-shrink-0 '>
        <div className=' font-kanit-text font-semibold text-2xl md:text-4xl  '>
          Issues
        </div>
        <div className=' absolute right-2 sm:right-10'>
          {loggedUser.get().userId === '' ? (
            ''
          ) : (
            <Button
              text='Add issue'
              callback={() => {
                // setAddIssue();
              }}
              color='secondary'
              size='small'
            />
          )}
        </div>

        <button
          type='button'
          className=' w-6 h-6 absolute left-2 sm:left-10 select-none'
          onClick={() => {
            // close tab-attachment
            // flipOpen();
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
      {divWrapper(<IssueButton />)}
      <div className='grow w-full overflow-auto '>
        {divWrapper(
          <div className=' w-full  '>
            <div>
              {loaded &&
                displayedIssues.map((issue) => {
                  return (
                    <Issue
                      key={issue.id}
                      id={issue.id}
                      title={issue.title}
                      open={issue.open}
                      author={issue.author}
                      authorId={issue.authorId}
                      imgUrl={issue.profilePictureUrl}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <PageArrows
        decPage={() => {
          if (page <= 1) return;
          setPage((prev) => prev - 1);
        }}
        incPage={() => {
          if (page >= Math.ceil(issues.length / issuePerPage)) return;
          setPage((prev) => prev + 1);
        }}
        toBegin={() => {
          setPage(1);
        }}
        toEnd={() => {
          setPage(Math.ceil(issues.length / issuePerPage));
        }}
        page={page}
      />
    </div>
  );
};

export default Issues;
