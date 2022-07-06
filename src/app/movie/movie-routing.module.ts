import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageSectionComponent } from './homePage/home-page/home-page.component';
import { MovieDetailsSectionComponent } from './movie-details/movie-details/movie-details.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from '../helper/auth.guard';

const routes: Routes = [
    { path: 'movieDetails', component: MovieDetailsSectionComponent},
    { path: '', component: HomePageSectionComponent},
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }