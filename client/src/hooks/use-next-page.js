import { useEffect, useState } from 'react';

export const useNextPage = (pagesCount, currentPage, list) => {
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if (pagesCount === currentPage) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [pagesCount, list]);

  return hasNextPage;
};
