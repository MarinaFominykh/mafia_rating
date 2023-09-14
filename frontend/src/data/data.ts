import { IDataUser } from '@/models/IDataUser';
interface profile {
  id: string;
  description: string;
  src: string;
  field: keyof IDataUser;
}
// export const dataProfile: profile[] = [
//   {
//     id: '1',
//     description: 'Количество игр',
//     src: 'profile_amount',
//     field: 'games',
//   },
//   {
//     id: '2',
//     description: 'Мафия (сыграно/побед)',
//     src: 'profile_black',
//     field: 'blackGames',
//   },
//   {
//     id: '3',
//     description: 'Мирный (сыграно/побед)',
//     src: 'profile_red',
//     field: 'redGames',
//   },
//   {
//     id: '4',
//     description: 'Шериф (сыграно/побед)',
//     src: 'profile_sheriff',
//     field: 'sheriffGames'
//   },
//   {
//     id: '5',
//     description: 'Дон (сыграно/побед)',
//     src: 'profile_done',
//   },
// ];
