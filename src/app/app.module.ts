import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './movie/login/login/login.component';
import { HomePageSectionComponent } from './movie/homePage/home-page/home-page.component';
import { MovieDetailsSectionComponent } from './movie/movie-details/movie-details/movie-details.component';
import { WebStorageModule } from 'ngx-store';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from './shared/shared.module';
import { MovieModule } from './movie/movie.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageSectionComponent,
    MovieDetailsSectionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebStorageModule,
    Ng2SearchPipeModule,
    SharedModule,
    MovieModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
