import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { setExploreQueryPage } from '@components/explore/stores/explore-query-store';

type IPaginationProps = {
  currentPage: number;
  roadmapsPerPage: number;
  totalRoadmaps: number;
  isMobile?: boolean;
};

export function calculatePages(
  currentPage: number,
  displayedPages: number,
  roadmapsPerPage: number,
  totalRoadmaps: number
) {
  const maxPages = (totalRoadmaps - 1) / roadmapsPerPage + 1;
  let auxIndex = 1;
  let displayedPagesAux = displayedPages;
  const pageNumbers = [currentPage];

  while (displayedPagesAux > 0) {
    if (currentPage - auxIndex > 0) {
      pageNumbers.push(currentPage - auxIndex);
      displayedPagesAux -= 1;
    }

    if (currentPage + auxIndex <= maxPages) {
      pageNumbers.push(currentPage + auxIndex);
      displayedPagesAux -= 1;
    }
    auxIndex += 1;
    if (currentPage - auxIndex <= 0 && currentPage + auxIndex > maxPages) break;
  }

  pageNumbers.sort((a, b) => a - b);
  return pageNumbers;
}

const Pagination = ({
  currentPage,
  roadmapsPerPage,
  totalRoadmaps,
  isMobile,
}: IPaginationProps) => {
  const totalPages = 8; // total number of displayed pages

  const pageNumbers = calculatePages(
    currentPage,
    totalPages,
    roadmapsPerPage,
    totalRoadmaps
  );

  const roadmapIndexStart = (currentPage - 1) * roadmapsPerPage + 1;
  let roadmapIndexEnd = currentPage * roadmapsPerPage;

  if (roadmapIndexEnd > totalRoadmaps) {
    roadmapIndexEnd = totalRoadmaps;
  }

  return (
    <div className='relative'>
      <div className='flex gap-2'>
        {pageNumbers.map((pageNumber) => {
          const isSelected = pageNumber === currentPage;
          return (
            <div
              key={pageNumber}
              className={` ${isSelected && 'border-b-2 border-darkBlue'}`}
            >
              <button
                key={pageNumber}
                type='button'
                className={`p-2 font-roboto-text font-medium hover:text-darkBlue ${
                  isSelected ? 'text-darkBlue' : 'text-secondary'
                }${tailwindTransitionClass}`}
                onClick={() => {
                  setExploreQueryPage(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            </div>
          );
        })}
      </div>
      {!isMobile && (
        <div className='absolute -left-72 top-0 flex gap-2 items-center h-full'>
          <span className='font-roboto-text font-medium text-secondary'>
            {roadmapIndexStart} - {roadmapIndexEnd}
          </span>
          <span className='font-roboto-text text-placeholder'>of</span>
          <span className='font-roboto-text font-medium text-secondary'>
            {totalRoadmaps}
          </span>
          <span className='font-roboto-text text-placeholder'>roadmaps</span>
        </div>
      )}
    </div>
  );
};

Pagination.defaultProps = {
  isMobile: false,
};

export default Pagination;
