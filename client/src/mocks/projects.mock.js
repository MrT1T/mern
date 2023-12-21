import { STATUS } from '../constant/status.const';

export const projectsMock = [
  {
    name: 'Los_Angeles',
    title: 'Basketball',
    usersList: [{ username: 'Hoyt_Wunsch' }]
  },
  {
    name: 'Detroit_Red',
    title: 'Hockey',
    usersList: [{ username: 'Ruthie_Predovic' }]
  },
  {
    name: 'Real_Madrid_funs',
    title: 'Football',
    usersList: [{ username: 'Bla_Bla' }]
  },
  {
    name: 'Funs',
    title: 'Hockey',
    usersList: [{ username: 'Eleanora_Keebler' }, { username: 'Cassie.Rippin' }]
  },
  {
    name: 'Frag_Robots',
    title: 'Football',
    usersList: [{ username: 'Eleanora_Keebler' }]
  },
  {
    name: 'Grandiose_Racers',
    title: 'Football',
    usersList: []
  }
];

export const filteredProjectsMock = {
  projects: projectsMock,
  projectsStatus: STATUS.SUCCESS,
  pagesCount: 2
};

export const emptyProjectsMock = {
  projects: [],
  projectsStatus: STATUS.IDLE,
  pagesCount: null
};
export const filterData = { page: 2 };
export const filterUrl = '?page=2';

export const projectsSliceData = {
  projects: projectsMock,
  pagesCount: 1
};
