// Angular imports
import { Component, OnInit } from '@angular/core';

// Component imports
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { DescriptionComponent } from '../description/description.component';

// Data imports
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material imports
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  // Movies variable gets declared as an array. This is where movies returned from API will be kept.
  movies: any[] = [];
  favouriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

  /**
   * Gets movies from API call and sets movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Gets favourite movies from API call and sets favourite movies variable to return JSON file
   * @returns array holding id's of user's favourite movies
   * @function getFavouriteMovies
   */
  getFavouriteMovies(): void {
    this.fetchApiData.getFavouriteMovies().subscribe((resp: any) => {
      this.favouriteMovies = resp;
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    });
  }

  /**
   * Checks if a movie is included in the user's list of favourite movies
   * @param {string} id
   * @returns true, if the movie is a favourite movie, else false
   */
  isFav(id: string): boolean {
    return this.favouriteMovies.includes(id);
  }

  /**
   * Adds a movie to the list of favorite movies via API call
   * @param {string} id
   * @function addFavouriteMovie
   */
  addToFavouriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.addFavouriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie from the list of favorite movies via API call
   * @param {string} id
   * @function removeFavouriteMovie
   */
  removeFromFavouriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavouriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * Opens director dialog from DirectorComponent to display director details
   * @param {string} name
   * @param {string} bio
   * @param {date} birth
   */
  openDirectorDialog(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  /**
   * Opens genre dialog from GenreComponent to display genre details
   * @param {string} name
   * @param {string} description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  /**
   * Opens description dialog from DescriptionComponent to display description details
   * @param {string} title
   * @param {string} description
   */
  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assign dialog width
      width: '500px',
    });
  }
}
