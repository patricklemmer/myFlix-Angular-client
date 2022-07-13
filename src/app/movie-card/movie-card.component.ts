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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Function below is called
    this.getMovies();
  }
  //  Function fetches movies from FetchApiDataService service with help of getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

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
