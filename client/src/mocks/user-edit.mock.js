export const allProjectsMock = [
  { value: '61447048e6719c7f80110e92', name: 'TestProject' },
  { value: '61447048e6719c7f80110e93', name: 'Detroit_Red' },
  { value: '61447048e6719c7f80110e91', name: 'Real_Madrid_funs' }
];

export const userMock = {
  error: null,
  isLoading: false,
  user: {
    _id: '615196dad43f2b0df42f8b7e',
    username: 'Aaron',
    firstName: 'Judy',
    lastName: 'Schuster',
    email: 'Einar_Upton26@yahoo.com',
    projectsList: allProjectsMock,
    id: 8
  }
};
export const userErrorsMock = {
  error: null,
  isLoading: false,
  user: {
    _id: '61447048e6719c7f80110e92',
    username: '',
    firstName: '',
    lastName: '',
    email: 'error@email@.com',
    projectsList: [],
    id: 8
  }
};
export const userErrorMock = {
  error: true,
  isLoading: false,
  user: null
};
export const userLoadingMock = {
  error: null,
  isLoading: true,
  user: {}
};

export const userName = {
  username: 'Aaron'
};
