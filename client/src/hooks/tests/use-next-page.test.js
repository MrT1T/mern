import { renderHook } from '@testing-library/react-hooks';
import { useNextPage } from '../use-next-page';
import { nextPageExist, nextPageNotExist } from '../../mocks/next-page.mock';

describe('useNextPage tests', () => {
  it('useNextPage render with different props ', async () => {
    const { result, rerender } = renderHook(
      ({ pagesCount, currentPage, list }) =>
        useNextPage(pagesCount, currentPage, list),
      {
        initialProps: nextPageExist
      }
    );
    expect(result.current).toBeTruthy();

    rerender(nextPageNotExist);

    expect(result.current).toBeFalsy();
  });
});
