import { useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import InfoCharacters from '@/components/InfoCharacters';


  export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { page, nameFilter } = query;

    return {
      props: {
        page: page || 1,
        nameFilter: nameFilter || '',
      },
    };
  };

  const Characters: NextPage<{ page: string; nameFilter: string }> = ({ page, nameFilter }) => {
    const [currentPage, setCurrentPage] = useState(parseInt(page));
    const [totalPages, setTotalPages] = useState(1);

    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      const name = event.target.value;
      if (name) {
        Router.push(`/characters?nameFilter=${name}`);
      } else {
        Router.push(`/characters`);
      }
    };

    return (
      <>
        <h2>Characters</h2>
        <input type="text" placeholder="Search by name" onChange={handleSearch} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <InfoCharacters page={currentPage} nameFilter={nameFilter} onSetTotalPages={setTotalPages} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handlePrevPage}>Prev</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </>
    );
  };

  export default Characters;