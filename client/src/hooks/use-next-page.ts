import { useEffect, useState } from 'react';
import type { UseNextPage } from '../types/hooks.type';

export const useNextPage: UseNextPage = (pagesCount, currentPage, list) => {
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
