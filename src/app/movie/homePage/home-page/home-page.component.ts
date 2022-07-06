import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MOVIELIST } from 'src/app/mockJson';
import { Movie } from 'src/app/movie/models/Movie';
import { User } from 'src/app/movie/models/User';
import { AuthenticationService } from 'src/app/movie/services/authentication.service';
import { SessionStorageService } from 'ngx-store';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageSectionComponent implements OnInit {
  movieList : Movie[] = [];
  currentUser: User;
  loggedInUser: User;
  watchList: string[] = [];
  searchText: string;
  isAdmin: boolean = false;
  primeMembershipValue: string = "Opt in Prime Membership";
  primeMembershipStatus: boolean = false;
  constructor(private router: Router, private authenticationService: AuthenticationService, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    if(this.sessionStorageService.get('MOVIELIST')==undefined || this.sessionStorageService.get('MOVIELIST')==null){
      this.sessionStorageService.set('MOVIELIST', MOVIELIST);
    }
    this.currentUser = this.sessionStorageService.get("CURRENTUSER");
    if(this.currentUser){
      this.primeMembershipStatus = this.currentUser?.isPrime!;
      this.primeMembershipValue = this.primeMembershipStatus?"Prime Member": "Opt in Prime Membership";
      this.watchList = this.currentUser?.watchList!;
    }

    this.movieList = this.sessionStorageService.get('MOVIELIST');
    this.loggedInUser = this.authenticationService.currentUserValue;
    if (this.loggedInUser) {
        this.isAdmin = this.loggedInUser.userType === 'admin'? true : false;
    }
  }

  showMovieDetails(movieId: number): void {
    this.router.navigate(['/movieDetails'], { queryParams: { id: movieId }});
  }

  addMovieToMovieList(): void {
    this.router.navigate(['/movieDetails']);
  }

  login(): void {
    this.router.navigate(['/login']);
  } 
  logout(): void {
    this.authenticationService.logout();
  }

  optInPrime(): void {
    this.primeMembershipValue = "Prime Member";
    this.primeMembershipStatus = true;
    
    if(this.currentUser){
      this.currentUser.isPrime = true;
      this.sessionStorageService.set("CURRENTUSER", this.currentUser);
    }
  }
}
