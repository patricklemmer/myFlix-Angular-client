import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  // Movies variable gets declared as an array. This is where movies returned from API will be kept.
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

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
}
