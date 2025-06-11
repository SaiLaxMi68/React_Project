import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  background: ${(props) => (props.active ? '#1976d2' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#1976d2')};
  border: 1px solid #1976d2;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationWrapper>
      <PageButton disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </PageButton>
      {Array.from({ length: totalPages }, (_, i) => (
        <PageButton
          key={i}
          onClick={() => onPageChange(i)}
          active={i === currentPage}
        >
          {i + 1}
        </PageButton>
      ))}
      <PageButton
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
