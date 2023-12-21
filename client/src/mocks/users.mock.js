import { STATUS } from '../constant/status.const';

export const usersMock = [
  {
    username: 'Brisa_Will',
    firstName: 'Christ',
    lastName: 'Rolf',
    email: 'Cordelia.Maggio31@yaaaa.com',
    projectsList: [{ name: 'Frag_Robots' }]
  },
  {
    username: 'Eudora.Watsica91',
    firstName: 'Sadye',
    lastName: 'Sch',
    email: 'Carlo27@yahasdf.com',
    projectsList: [
      { name: 'Grandiose_Racers' },
      { name: 'Supreme_Ravens' },
      { name: 'Real_Madrid_funs' }
    ]
  },
  {
    username: 'Jewel80asd',
    firstName: 'Geovanyasd',
    lastName: 'aadMcKenzie',
    email: 'Abelardo66@yahoo.com',
    projectsList: [
      { name: 'Acidiewww' },
      { name: 'Detroit_Red' },
      { name: 'Los_Angeles' }
    ]
  },
  {
    username: 'Bla_Bla',
    firstName: 'Lindsay',
    lastName: 'Gibson',
    email: 'asdasdas@fjfsdf.com',
    projectsList: [{ name: 'Dream_Wildcats' }, { name: 'Ultimate_Knights' }]
  },
  {
    username: 'Fleta.Schneider68',
    firstName: 'Brooklyn',
    lastName: 'Nikolaus',
    email: 'Wilton.Gislason11@hotmail.com',
    projectsList: [{ name: 'Royal_Stallions' }, { name: 'Venomous_Chargers' }]
  },
  {
    username: 'Eleanora_Keebler',
    firstName: 'Jeffrey',
    lastName: 'Jakubowski',
    email: 'Casimir.Shields@hotmail.com',
    projectsList: [{ name: 'Funs' }, { name: 'Frag_Robots' }]
  }
];

export const filteredUsersMock = {
  users: usersMock,
  usersStatus: STATUS.SUCCESS,
  pagesCount: 2
};
export const emptyUsersMock = {
  users: [],
  usersStatus: STATUS.IDLE,
  pagesCount: null
};

export const usersSliceData = {
  users: usersMock,
  pagesCount: 1
};
