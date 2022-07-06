import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helper/auth.guard';
import { HomePageSectionComponent } from './movie/homePage/home-page/home-page.component';
import { LoginComponent } from './movie/login/login/login.component';
import { MovieDetailsSectionComponent } from './movie/movie-details/movie-details/movie-details.component';

const routes: Routes = [
    { path: 'homePage', component: HomePageSectionComponent, canActivate: [AuthGuard] },
    { path: 'movieDetails', component: MovieDetailsSectionComponent},
    { path: '', component: HomePageSectionComponent},
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }