import { Component, OnChanges, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-store';
import { User } from 'src/app/movie/models/User';
import { AuthenticationService } from 'src/app/movie/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser: User;
  constructor(private router : Router, private sessionStorageService : SessionStorageService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loggedInUser = this.sessionStorageService.get('CURRENTUSER');
  }
  goToHome(): void {
    this.router.navigate(['/homePage']);
  } 
  logout(): void {
    this.authenticationService.logout();
  }


}
