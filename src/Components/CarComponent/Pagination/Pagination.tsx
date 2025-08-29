import React, { JSX } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
}): JSX.Element => {
  const handleChange = (selectedItem: { selected: number }): void => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel={'←'}
      nextLabel={'→'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handleChange}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      previousClassName={styles.navBtn}
      nextClassName={styles.navBtn}
    />
  );
};

export default Pagination;
