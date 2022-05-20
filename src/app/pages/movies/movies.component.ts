import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscoverMovie } from 'src/app/services/interfaces/discoverMovies.interface';
import { DiscoverTv } from 'src/app/services/interfaces/discoverTv.interface';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Movie } from '../../services/interfaces/movie.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  recommend: Movie[] = [];
  showRecommendImg: string = '';
  noRecommendImg = '../../../assets/video/VGA-no-signal-image.jpeg';
  finished = false;
  currentPage = 1;
  baseSearchMovie: DiscoverMovie = {
    page: 1,
    year: 2022,
  };
  baseSearchTv: DiscoverTv = {
    page: 1,
  };

  constructor(private tmdbService: TmdbService, private _router: Router) {}

  ngOnInit(): void {
    this.tmdbService.getDiscoverMovie(this.baseSearchMovie).subscribe();

    this.tmdbService.movieListObs$.subscribe((movies) => {
      this.movies = [...movies];
    });
    this.tmdbService.recommendListObs$.subscribe((recom) => {
      this.recommend = [...recom];
      if (this.recommend.length && this.recommend[0].id) {
        this.handleHoverRecommend(this.recommend[0].id);
      }
    });
  }

  handleHoverRecommend(id: number) {
    const movie = this.recommend.find((item: Movie | any) => +item.id === +id);
    this.showRecommendImg =
      movie && movie.backdrop_path
        ? this.tmdbService.getMovieImagePath(movie.backdrop_path, 'w1280')
        : this.noRecommendImg;
  }

  onScroll() {
    this.tmdbService.handleScrol().subscribe();
  }

  navigateMovie(id: number) {
    this._router.navigate(['/movies', id]);
  }

  trackByFn(i: number, item: Movie) {}

  switchToMoiveList() {
    // this.tmdbService
    //   .getDiscoverMovie(this.baseSearchMovie)
    //   .subscribe((data) => {
    //     this.movies = [...data];
    //     this.recommend = [...this.movies.slice(0, 7)];
    //     this.recommend[0].id &&
    //       this.handleHoverRecommend(this.recommend[0].id + '');
    //   });
  }
  switchToTvList() {
    // this.tmdbService.getDiscoverTV(this.baseSearchTv).subscribe((data) => {
    //   this.movies = [...data];
    //   this.recommend = [...this.movies.slice(0, 7)];
    //   this.recommend[0].id &&
    //     this.handleHoverRecommend(this.recommend[0].id + '');
    // });
  }
}
