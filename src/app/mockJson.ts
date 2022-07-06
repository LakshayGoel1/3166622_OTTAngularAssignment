import { Movie } from './movie/models/Movie';
import { User } from './movie/models/User';

export const MOVIELIST: Movie[] = [{id:1, name: 'Friends', title:'Friends', description:'Comedy tv series', imdb: 9.3, language:'English', genre:'Comedy', imageUrl:'/assets/images/friends.jpg'},
{id:2, name: 'Big Bang Theory', title:'Big Bang Theory', description:'Comedy tv series', imdb: 8.7, language:'English', genre:'Comedy', imageUrl: '/assets/images/BigBangTheory.jpg'},
{id:3, name: 'Money Heist', title:'Money Heist', description:'Thriller tv series', imdb: 9.1, language:'English', genre:'Thriller', imageUrl: '/assets/images/money-heist.jpg'},
{id:4, name: 'Prithviraj', title:'Prithviraj', description:'Action Movie', imdb: 8.9, language:'Hindi', genre:'Action', imageUrl: '/assets/images/Prithviraj-Movie.jpg'}];

export const USERLIST: User[] = [{ id: 1, username: 'admin', password: 'Admin@123', userType: 'admin'}, { id: 2, username: 'user', password: 'User@123', userType: 'user', isPrime: false, watchedList: []},
{id: 3, username: 'test', password: 'Test@123', userType: 'user', isPrime: false, watchedList: []}];