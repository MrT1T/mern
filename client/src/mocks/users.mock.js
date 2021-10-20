import { STATUS } from '../constant/status.const';

export const usersMock = [
  {
    username: 'Brisa_Will',
    firstName: 'Christ',
    lastName: 'Rolf',
    email: 'Cordelia.Maggio31@yaaaa.com',
    groupsList: [{ name: 'Frag_Robots' }]
  },
  {
    username: 'Eudora.Watsica91',
    firstName: 'Sadye',
    lastName: 'Sch',
    email: 'Carlo27@yahasdf.com',
    groupsList: [
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
    groupsList: [
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
    groupsList: [{ name: 'Dream_Wildcats' }, { name: 'Ultimate_Knights' }]
  },
  {
    username: 'Fleta.Schneider68',
    firstName: 'Brooklyn',
    lastName: 'Nikolaus',
    email: 'Wilton.Gislason11@hotmail.com',
    groupsList: [{ name: 'Royal_Stallions' }, { name: 'Venomous_Chargers' }]
  },
  {
    username: 'Eleanora_Keebler',
    firstName: 'Jeffrey',
    lastName: 'Jakubowski',
    email: 'Casimir.Shields@hotmail.com',
    groupsList: [{ name: 'Funs' }, { name: 'Frag_Robots' }]
  }
];

export const filteredUsersMock = {
  users: usersMock,
  groupsStatus: STATUS.SUCCESS,
  countPages: 2
};
