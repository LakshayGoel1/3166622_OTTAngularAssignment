import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MOVIELIST } from 'src/app/mockJson';
import { Movie } from 'src/app/movie/models/Movie';
import { User } from 'src/app/movie/models/User';
import { AuthenticationService } from 'src/app/movie/services/authentication.service';
import { SessionStorageService } from 'ngx-store';
import { UserReviewForm } from 'src/app/movie/models/UserReviewForm';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsSectionComponent implements OnInit {
  isAdmin: boolean = false;
  movieId: number;
  currentUser: User;
  movieList : Movie[] = [];
  currentMovie: Movie;
  imageUrl: string;
  submitted = false;
  watchList : string[] = [];
  watchStatus : string = "Watch Now";
  watched : boolean = false;
  addedToWatchlist : boolean = false;
  markedAsWatchLater: boolean = false;
  addMovieForm = new FormGroup({
    name: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    imdbRating: new FormControl(''),
    language: new FormControl(''),
    genre: new FormControl(''),
  });
  userReview : string = "";
  userReviewList : UserReviewForm[] = [];
  watchedList: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private sessionStorageService: SessionStorageService,
    private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
      this.addMovieForm = this.formBuilder.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        imdbRating: ['', Validators.required],
        language: ['', Validators.required],
        genre: ['', Validators.required]
    });
     }

  ngOnInit(): void {
    this.markedAsWatchLater = false;
    if(this.sessionStorageService.get('MOVIELIST')==undefined || this.sessionStorageService.get('MOVIELIST')==null){
      this.movieList = MOVIELIST;
    } else {
      this.movieList = this.sessionStorageService.get('MOVIELIST');
    }
    if(this.sessionStorageService.get('CURRENTUSER')!=undefined && this.sessionStorageService.get('CURRENTUSER')!=null) {
      this.currentUser = this.sessionStorageService.get('CURRENTUSER');
      if(this.currentUser?.watchList !== undefined) {
        this.watchList = this.currentUser?.watchList;
      }
      if(this.currentUser?.watchedList !== undefined) {
        this.watchedList = this.currentUser?.watchedList;
      } 
    }
    
    this.imageUrl = '/assets/images/NewMovie.jpg'
    this.route.queryParams
      .subscribe(params => {
        this.movieId = params['id'];
          if (this.movieId !== undefined && this.movieId !== null) {    
          this.currentMovie = this.movieList.filter(x => x.id == this.movieId)[0];
          this.imageUrl = this.currentMovie.imageUrl;
          this.addMovieForm.setValue({name: this.currentMovie.name,
            title: this.currentMovie.title,
            description: this.currentMovie.description,
            imdbRating: this.currentMovie.imdb,
            language: this.currentMovie.language,
            genre: this.currentMovie.genre});
          }
          if(localStorage.getItem('REVIEWLIST')!=undefined && localStorage.getItem('REVIEWLIST')!=null){
            const userReviewList: UserReviewForm[] = JSON.parse(localStorage.getItem('REVIEWLIST')!);
            this.userReviewList = userReviewList.filter(reviews => reviews.movieName === this.addMovieForm.get('name')?.value);
          }
      });
    if(this.watchList?.includes(this.addMovieForm.get('name')?.value)){
      this.markedAsWatchLater = true;
    } 
    if(this.watchedList?.includes(this.addMovieForm.get('name')?.value)) {
      this.watchStatus = "Watch Again";
    }
    const user: User = this.authenticationService.currentUserValue;
    if (user) {
        this.isAdmin = user.userType === 'admin'? true : false;
    }
  }

  get f() { return this.addMovieForm.controls; }
  

  saveMovie(): void {
    this.submitted = true;
    if (this.addMovieForm.invalid) {
      return;
    }
      const movie: Movie = {id: this.movieList.length + 1, description: this.addMovieForm.get('description')?.value,
       language: this.addMovieForm.get('language')?.value,
        name: this.addMovieForm.get('name')?.value, title: this.addMovieForm.get('title')?.value,
        genre: this.addMovieForm.get('genre')?.value,
        imdb: this.addMovieForm.get('imdbRating')?.value,
        imageUrl:"/assets/images/NewMovie.jpg"};
      
      this.movieList.push(movie);
      this.sessionStorageService.set('MOVIELIST', this.movieList);
      this.router.navigate(
        ['/homePage']);
  }

  watchLater():void {
    this.addedToWatchlist = true;
    let userLocal = this.sessionStorageService.get("CURRENTUSER");
        if (!userLocal) {
          this.router.navigate(
            ['/login']);
            return;
        }

    userLocal.watchList = userLocal.watchList?.length>0 ? userLocal.watchList : [];
    userLocal.watchList.push(this.addMovieForm.get('name')?.value);
    this.watchList.push(this.addMovieForm.get('name')?.value);
    this.sessionStorageService.set('CURRENTUSER', userLocal);
  }

  watchNow():void {
   // const user: User = this.authenticationService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(
        ['/login']);
        return;
    }
    if(this.currentUser!=undefined && !this.currentUser?.isPrime) {
      alert("You need to be a prime member to watch this movie");
      this.router.navigate(
        ['/homePage']);
        return;
    }
    this.watchStatus = "Watched";
    this.watched = true;
    this.watchedList.push(this.addMovieForm.get('name')?.value);
    let userLocal = this.sessionStorageService.get('CURRENTUSER');
    this.currentUser.watchedList = userLocal.watchedList?.length>0 ? this.currentUser.watchedList : [];
    userLocal.watchedList.push(this.addMovieForm.get('name')?.value);
    this.sessionStorageService.set('CURRENTUSER', userLocal);
  }

  addReview():void {
    if(this.userReview.trim()===""){
      alert('Review can not be blank');
      return;
    }
    const data: UserReviewForm = {
      username : this.currentUser.username, 
      movieName : this.addMovieForm.get('name')?.value,
      userReview : this.userReview
    }
    this.userReviewList.push(data);
    let userReviewList= JSON.parse(localStorage.getItem('REVIEWLIST')!);
    userReviewList = userReviewList?.length>0 ? userReviewList : [];
    userReviewList.push(data);
    localStorage.setItem('REVIEWLIST', JSON.stringify(userReviewList));
    this.userReview = '';
  }

}
