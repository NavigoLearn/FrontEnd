import React from 'react';

type IPaginationProps = {
  currentPage: number;
  roadmapsPerPage: number;
  totalRoadmaps: number;
};

export function calculatePages(
  currentPage: number,
  displayedPages: number,
  roadmapsPerPage: number,
  totalRoadmaps: number
) {
  const maxPages = totalRoadmaps / roadmapsPerPage;
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
}: IPaginationProps) => {
  const totalPages = 8; // total number of displayed pages

  const pageNumbers = calculatePages(
    currentPage,
    totalPages,
    roadmapsPerPage,
    totalRoadmaps
  );

  const roadmapIndexStart = (currentPage - 1) * roadmapsPerPage + 1;
  const roadmapIndexEnd = currentPage * roadmapsPerPage;

  return (
    <div className='relative'>
      <div className='flex gap-2'>
        {pageNumbers.map((pageNumber) => {
          const isSelected = pageNumber === currentPage;
          return (
            <div
              key={pageNumber}
              className={`p-2 ${isSelected && 'border-b-2 border-darkBlue'}`}
            >
              <button
                key={pageNumber}
                type='button'
                className={`font-roboto-text font-medium ${
                  isSelected ? 'text-darkBlue' : 'text-secondary'
                }`}
                onClick={() => {
                  console.log(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            </div>
          );
        })}
      </div>
      <div className='absolute -left-96 top-0 flex gap-2 items-center'>
        <span className='font-roboto-text font-medium text-secondary'>
          {roadmapIndexStart} - {roadmapIndexEnd}
        </span>
        <span className='font-roboto-text text-placeholder'>of</span>
        <span className='font-roboto-text font-medium text-secondary'>
          {totalRoadmaps}
        </span>
        <span className='font-roboto-text text-placeholder'>roadmaps</span>
      </div>
    </div>
  );
};

export default Pagination;
