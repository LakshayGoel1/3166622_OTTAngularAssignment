import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SessionStorageService } from 'ngx-store';
import { MOVIELIST } from 'src/app/mockJson';
import { User } from '../../models/User';

import { HomePageSectionComponent } from './home-page.component';

describe('HomePageSectionComponent', () => {
  let component: HomePageSectionComponent;
  let fixture: ComponentFixture<HomePageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageSectionComponent ],
      imports: [RouterTestingModule, Ng2SearchPipeModule],
      providers: [SessionStorageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should run on #ngOnInit', () => {
    const currentUser: User = {id: 3, username: 'test', password: 'Test@123', userType: 'user', isPrime: false, watchedList: []};
    spyOn(component['sessionStorageService'], 'get').withArgs('MOVIELIST').and.returnValue(MOVIELIST)
    .withArgs('CURRENTUSER').and.returnValue(currentUser);
    component.ngOnInit();
    expect(component.primeMembershipValue).toEqual('Opt in Prime Membership');
    expect(component.primeMembershipStatus).toEqual(false);
    expect(component.isAdmin).toEqual(false);
  });
  it('Should run on #optInPrime', () => {
    component.optInPrime();
    expect(component.primeMembershipValue).toEqual('Prime Member');
    expect(component.primeMembershipStatus).toEqual(true);
  });
  
});
