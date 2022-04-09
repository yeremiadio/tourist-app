import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { usePagination, DOTS } from "../../utils/usePagination";
import { ChangeEvent, FC, SetStateAction, useState } from "react";
import classNames from "../../utils/tailwindClassNames";
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */

interface Props {
  currentPage: number | any;
  itemsPerPage: number | any;
  totalPage: number | any;
  totalRecord: number | any;
  setPage: any;
  siblingCount: number | any;
}

const PaginationButton: FC<Props> = (props) => {
  const {
    currentPage,
    siblingCount,
    totalPage,
    itemsPerPage,
    setPage,
    totalRecord,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalRecord,
    totalPage,
    siblingCount,
    pageSize: itemsPerPage,
  }) as Array<any>;

  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    setPage(currentPage + 1);
  };

  const onPrevious = () => {
    setPage(currentPage - 1);
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex sm:hidden justify-between z-40 py-4 w-full">
        <span
          onClick={onPrevious}
          className={classNames(
            "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
            currentPage === 1 && "disabled:opacity-50"
          )}
        >
          Previous
        </span>
        <span
          onClick={onNext}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </span>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{props.currentPage}</span> of{" "}
            <span className="font-medium">{props.totalPage}</span> pages
          </p>
        </div>
        <div>
          <ul
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <li
              onClick={onPrevious}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" />
            </li>
            {paginationRange?.map((num, index) => {
              if (num === DOTS) {
                return (
                  <li
                    key={index}
                    className="relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  >
                    &#8230;
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  onClick={(event) => {
                    setPage(event.currentTarget.textContent);
                    const pageNumber = Number(event.currentTarget.textContent);
                    setPage(pageNumber);
                  }}
                  className={classNames(
                    "relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer",
                    num === currentPage
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  )}
                >
                  {num}
                </li>
              );
            })}
            <li
              onClick={onNext}
              className={classNames(
                "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              )}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaginationButton;
