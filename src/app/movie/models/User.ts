export class User {
    id: number;
    username: string;
    password: string;
    userType: string;
    isPrime?: boolean = false;
    watchList?: string[] = [];
    watchedList?: string[] = [];
}