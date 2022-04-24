import { Component, OnInit } from '@angular/core';
import { DiscoverMovie } from 'src/app/services/interfaces/discoverMovies.interface';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: any = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    const search: DiscoverMovie = {
      page: 1,
      year: 2002,
      include_video: true,
    };
    this.tmdbService.getDiscoverMovie(search).subscribe((data) => {
      // console.log('data from backend: ', data);
      this.movies = [...data];
    });
  }
}
