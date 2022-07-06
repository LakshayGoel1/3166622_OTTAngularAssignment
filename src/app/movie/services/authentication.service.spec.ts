import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-store';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SessionStorageService]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should run on #login', () => {
    const userType = service.login('user', 'User@123');
    expect(userType).not.toBeNull();
  });
  
  it('Should run on #UnauthorizedLogin', (done: DoneFn) => {
    service.login('user', 'user@123').subscribe({
    next: () => {},
    error: (error) => { expect(error).toBeTruthy(); done(); }
 });

});


});
