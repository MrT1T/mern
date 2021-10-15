export const groupMock = {
  error: null,
  isLoading: false,
  group: {
    _id: '61447048e6719c7f80110e92',
    name: 'Los_Angeles',
    title: 'Basketball',
    usersList: [
      { value: '61519a3bd43f2b0df42f8b83', name: 'Hoyt_Wunsch' },
      { value: '61447046e6719c7f80110e80', name: 'Eudora.Watsica91' },
      { value: '61519978d43f2b0df42f8b80', name: 'Katlynn17' }
    ],
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
  group: {}
};
export const groupLoadingMock = {
  error: null,
  isLoading: true,
  group: {}
};

export const allUsersMock = [
  { value: '61447046e6719c7f80110e7e', name: 'Brisa_Will' },
  { value: '61447046e6719c7f80110e80', name: 'Eudora.Watsica91' },
  { value: '61447046e6719c7f80110e7f', name: 'Jewel80' },
  { value: '6151941dd43f2b0df42f8b79', name: 'Bla_Bla' }
];

export const groupName = {
  groupname: 'BestGroup'
};
