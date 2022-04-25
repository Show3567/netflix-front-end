import { Component, OnInit } from '@angular/core';
import { DiscoverMovie } from 'src/app/services/interfaces/discoverMovies.interface';
import { DiscoverTv } from 'src/app/services/interfaces/discoverTv.interface';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Movie } from '../../services/interfaces/movie.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  recommend: any[] = [];
  showRecommendImg: string = '';
  searchMovie: DiscoverMovie = {
    page: 1,
    year: 2022,
  };
  searchTv: DiscoverTv = {
    page: 1,
  };

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getDiscoverMovie(this.searchMovie).subscribe((data) => {
      console.log(data);
      this.movies = [...data];
      this.recommend = [...this.movies.slice(0, 7)];

      this.recommend[0].id &&
        this.handleHoverRecommend(this.recommend[0].id + '');
    });
  }

  handleHoverRecommend(id: string) {
    const movie = this.recommend.find((item: Movie | any) => +item.id === +id);
    this.showRecommendImg =
      movie && movie.backdrop_path
        ? this.tmdbService.getMovieImagePath(movie.backdrop_path, 'w1280')
        : '';
  }
  switchToMoiveList() {
    this.tmdbService.getDiscoverMovie(this.searchMovie).subscribe((data) => {
      this.movies = [...data];
      this.recommend = [...this.movies.slice(0, 7)];
      this.recommend[0].id &&
        this.handleHoverRecommend(this.recommend[0].id + '');
    });
  }

  switchToTvList() {
    this.tmdbService.getDiscoverTV(this.searchTv).subscribe((data) => {
      this.movies = [...data];
      this.recommend = [...this.movies.slice(0, 7)];
      this.recommend[0].id &&
        this.handleHoverRecommend(this.recommend[0].id + '');
    });
  }
}
