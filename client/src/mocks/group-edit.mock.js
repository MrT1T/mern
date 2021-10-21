export const allUsersMock = [
  { value: '61447046e6719c7f80110e7e', name: 'TestUser' },
  { value: '61447046e6719c7f80110e80', name: 'Eudora' },
  { value: '61447046e6719c7f80110e7f', name: 'Jewel80' }
];

export const groupMock = {
  error: null,
  isLoading: false,
  group: {
    _id: '61447048e6719c7f80110e92',
    name: 'Los_Angeles',
    title: 'Basketball',
    usersList: allUsersMock,
    groupId: 1
  }
};
export const groupEmptyMock = {
  error: null,
  isLoading: false,
  group: {
    _id: '61447048e6719c7f80110e92',
    name: '',
    title: '',
    usersList: [],
    groupId: 1
  }
};
export const groupErrorMock = {
  error: true,
  isLoading: false,
  group: null
};
export const groupLoadingMock = {
  error: null,
  isLoading: true,
  group: {}
};

export const groupName = {
  groupname: 'BestGroup'
};
