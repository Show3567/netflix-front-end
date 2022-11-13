import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DiscoverMovie } from 'src/app/services/interfaces/discoverMovies.interface';
import { DiscoverTv } from 'src/app/services/interfaces/discoverTv.interface';
import { SearchMovieDto } from 'src/app/services/interfaces/searchMovieDto.interface';

import * as TmdbActions from 'src/app/Ngrx/Tmdb/tmdb.actions';

@Injectable({
  providedIn: 'root',
})
export class TmdbNgrxService {
  private readonly discoverMoviePath = 'discover/movie?';
  private readonly searchMoviePath = 'search/movie?';
  private readonly discoverTvPath = 'discover/tv?';
  private readonly moviePath = 'movie';

  // private movieList: Movie[] = [];
  // private movieList$ = new BehaviorSubject(this.movieList);
  // movieListObs$ = this.movieList$.asObservable();

  // private recommendList: Movie[] = [];
  // private recommendList$ = new BehaviorSubject(this.recommendList);
  // recommendListObs$ = this.recommendList$.asObservable();

  // private searchedMovieList: Movie[] = [];
  // private searchedMovieList$ = new BehaviorSubject(this.searchedMovieList);
  // searchedMovieListObs$ = this.searchedMovieList$.asObservable();

  // private showMovieList: boolean = true;
  // private showMovieList$ = new BehaviorSubject(this.showMovieList);
  // showMovieObs$ = this.showMovieList$.asObservable();

  private currentPage = 1;
  private baseDiscoverMovie: DiscoverMovie = {
    api_key: '',
    page: 1,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false,
    include_video: false,
    with_watch_monetization_types: 'flatrate',
  };
  private baseSearchMovie: SearchMovieDto = {
    api_key: '',
    query: '',
    language: 'en-US',
    page: 1,
  };
  private readonly baseDiscoverTv: DiscoverTv = {
    api_key: '',
    page: 1,
    language: 'en-US',
  };
  tmdbBaseUrl: any;

  set setMyApiKey(api_key: string) {
    this.baseDiscoverMovie.api_key = api_key;
    this.baseDiscoverTv.api_key = api_key;
    this.baseSearchMovie.api_key = api_key;
  }

  constructor(private readonly store: Store) {}

  // ~~~~~~~ methods ~~~~~~~
  getDiscoverMovie(search: DiscoverMovie) {
    const discoverMovies = { ...this.baseDiscoverMovie, ...search };
    let url = [this.tmdbBaseUrl, this.discoverMoviePath].join('/');

    Object.entries(discoverMovies).forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });

    this.store.dispatch(TmdbActions.DiscoverMovie({ url }));
  }

  searchMovie(keyword: string) {
    const query = { ...this.baseSearchMovie, query: keyword };
    let url = [this.tmdbBaseUrl, this.searchMoviePath].join('/');

    Object.entries(query).forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });

    this.store.dispatch(TmdbActions.SendSearchMovie({ url }));
  }

  // handleScrol() {
  //   const discover = { ...this.baseDiscoverMovie, page: ++this.currentPage };
  //   let url = [this.tmdbBaseUrl, this.discoverMoviePath].join('/');

  //   Object.entries(discover).forEach(([key, value]) => {
  //     url += `&${key}=${value}`;
  //   });

  //   return this.http.get<SearchMovieReturn>(url).pipe(
  //     tap((data) => {
  //       this.movieList = [...this.movieList, ...(data.results as Movie[])];
  //       this.movieList$.next(this.movieList);

  //       this.recommendList = [...this.movieList.slice(0, 7)];
  //       this.recommendList$.next(this.recommendList);
  //     })
  //   );
  // }

  // getDiscoverTV(search: DiscoverTv) {
  //   const discover = { ...this.baseDiscoverTv, ...search };
  //   let url = [this.tmdbBaseUrl, this.discoverTvPath].join('/');

  //   Object.entries(discover).forEach(([key, value]) => {
  //     url += `&${key}=${value}`;
  //   });
  //   return this.http.get(url).pipe(map((tv: any) => tv.results));
  // }

  // getMovieImagePath(path: string, quality: string): string {
  //   return [this.baseMovieImage, quality, path].join('/');
  // }

  // getMovie(id: number): Observable<Movie> {
  //   if (this.baseDiscoverMovie.api_key) {
  //     const url = `${[this.tmdbBaseUrl, this.moviePath, id].join(
  //       '/'
  //     )}?api_key=${this.baseDiscoverMovie.api_key}`;
  //     return this.http.get<Movie>(url);
  //   } else {
  //     // expected err;
  //     return this.http.get<Movie>('');
  //   }
  // }

  // getCredits(id: number): Observable<Credit> {
  //   if ((this.baseDiscoverMovie.api_key, id)) {
  //     const url = `${[this.tmdbBaseUrl, this.moviePath, id, 'credits'].join(
  //       '/'
  //     )}?api_key=${this.baseDiscoverMovie.api_key}`;

  //     return this.http.get<Credit>(url);
  //   } else {
  //     // expected err;
  //     return this.http.get<Credit>('');
  //   }
  // }

  // getPosters(id: number): Observable<MovieImage> {
  //   if ((this.baseDiscoverMovie.api_key, id)) {
  //     const url = `${[this.tmdbBaseUrl, this.moviePath, id, 'images'].join(
  //       '/'
  //     )}?api_key=${this.baseDiscoverMovie.api_key}`;

  //     return this.http.get<MovieImage>(url);
  //   } else {
  //     // expected err;
  //     return this.http.get<MovieImage>('');
  //   }
  // }

  // getVideo(id: number) {
  //   if (this.baseDiscoverMovie.api_key) {
  //     const url = [
  //       this.tmdbBaseUrl,
  //       this.moviePath,
  //       id,
  //       `videos?api_key=${this.baseDiscoverMovie.api_key}`,
  //     ].join('/');
  //     return this.http.get(url);
  //   } else {
  //     // expected err;
  //     return this.http.get('');
  //   }
  // }
}
