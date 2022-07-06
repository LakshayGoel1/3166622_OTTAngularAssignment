import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-store';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { MovieDetailsSectionComponent } from './movie-details.component';

xdescribe('MovieDetailsSectionComponent', () => {
  let component: MovieDetailsSectionComponent;
  let fixture: ComponentFixture<MovieDetailsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsSectionComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [SessionStorageService, AuthenticationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
