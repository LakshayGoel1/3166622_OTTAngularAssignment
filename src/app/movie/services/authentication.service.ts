import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { USERLIST } from 'src/app/mockJson';
import { SessionStorageService } from 'ngx-store';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    users: User[] = [];

    constructor(private router : Router, private sessionStorageService: SessionStorageService) {
      this.currentUserSubject = new BehaviorSubject<User>(this.sessionStorageService.get('CURRENTUSER'));
      this.currentUser = this.currentUserSubject.asObservable();
      this.users = USERLIST;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: any, password: any) {
      const user = this.users.find(x => x.username === username.toLowerCase() && x.password === password);
      if (!user) {
        const errorMsg = 'Authentication Failed: Incorrect username or password!';
        return throwError(errorMsg);
      } else {
        this.sessionStorageService.set("CURRENTUSER", user);
        this.currentUserSubject.next(user);
        return of(user.userType);
      }
    }

    logout() {
        this.sessionStorageService.remove("CURRENTUSER");
        this.router.navigate(['/login']);
    }
}