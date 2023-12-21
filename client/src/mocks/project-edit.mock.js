export const allUsersMock = [
  { value: '61447046e6719c7f80110e7e', name: 'TestUser' },
  { value: '61447046e6719c7f80110e80', name: 'Eudora' },
  { value: '61447046e6719c7f80110e7f', name: 'Jewel80' }
];

export const projectMock = {
  error: null,
  isLoading: false,
  project: {
    _id: '61447048e6719c7f80110e92',
    name: 'Los_Angeles',
    title: 'Basketball',
    usersList: allUsersMock,
    projectId: 1
  }
};
export const projectEmptyMock = {
  error: null,
  isLoading: false,
  project: {
    _id: '61447048e6719c7f80110e92',
    name: '',
    title: '',
    usersList: [],
    projectId: 1
  }
};
export const projectErrorMock = {
  error: true,
  isLoading: false,
  project: null
};
export const projectLoadingMock = {
  error: null,
  isLoading: true,
  project: {}
};

export const projectName = {
  projectname: 'BestProject'
};
