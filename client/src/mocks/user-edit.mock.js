export const userMock = {
  error: null,
  isLoading: false,
  user: {
    _id: '615196dad43f2b0df42f8b7e',
    username: 'Aaron',
    firstName: 'Judy',
    lastName: 'Schuster',
    email: 'Einar_Upton26@yahoo.com',
    groupsList: [
      { value: '61518768d43f2b0df42f8b74', name: 'BlaGroup' },
      { value: '61518768d43f2b0df42f8b75', name: 'Temporary_Elite' },
      { value: '615182bcd43f2b0df42f8b6e', name: 'Ambitious_Cowboys' }
    ],
    id: 8
  }
};
export const userEmptyMock = {
  error: null,
  isLoading: false,
  user: {
    _id: '61447048e6719c7f80110e92',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    groupsList: [],
    id: 8
  }
};
export const userErrorMock = {
  error: true,
  isLoading: false,
  user: {}
};
export const userLoadingMock = {
  error: null,
  isLoading: true,
  user: {}
};

export const allGroupsMock = [
  { value: '61447048e6719c7f80110e92', name: 'TestGroup' },
  { value: '61447048e6719c7f80110e93', name: 'Detroit_Red' },
  { value: '61447048e6719c7f80110e91', name: 'Real_Madrid_funs' },
  { value: '614cc9ff7811231c233bd135', name: 'Funs' }
];

export const userName = {
  username: 'Aaron'
};
