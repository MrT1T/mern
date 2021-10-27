import axios from 'axios';
import { AuthService } from '../auth.service';
import { TEST } from '../../constant/variable.const';
import { API_LINKS } from '../../constant/links.const';

describe('Auth service tests', () => {
  const spyApi = jest.spyOn(axios, 'post');
  it('Auth service sign in', () => {
    const mockRequest = Promise.resolve({ data: TEST });
    spyApi.mockImplementation(() => mockRequest);
    AuthService.signIn(TEST);
    expect(spyApi).toBeCalledWith(API_LINKS.SING_IN, TEST);
  });
});
