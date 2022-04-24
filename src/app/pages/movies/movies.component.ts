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
  moviesRecommend: any = [];
  search: DiscoverMovie = {
    page: 2,
  };

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getDiscoverMovie(this.search).subscribe((data) => {
      this.movies = [...data];
      this.moviesRecommend = [...this.movies.slice(0, 6)];
      console.log(this.moviesRecommend);
    });
  }
}
