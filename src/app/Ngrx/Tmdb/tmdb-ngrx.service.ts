import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DiscoverMovie } from 'src/app/services/interfaces/discoverMovies.interface';
import { DiscoverTv } from 'src/app/services/interfaces/discoverTv.interface';
import { SearchMovieDto } from 'src/app/services/interfaces/searchMovieDto.interface';

import * as TmdbActions from 'src/app/Ngrx/Tmdb/tmdb.actions';
import { MOVIEIMGBASEURL, TMDBBASEURL } from 'src/app/core/core.module';
import { Movie } from 'src/app/services/interfaces/movie.interface';
import { MovieImage } from 'src/app/services/interfaces/poster.interface';
import { Credit } from 'src/app/services/interfaces/credit.interface';

@Injectable({
  providedIn: 'root',
})
export class TmdbNgrxService {
  private readonly discoverMoviePath = 'discover/movie?';
  private readonly searchMoviePath = 'search/movie?';
  private readonly moviePath = 'movie';
  private readonly discoverTvPath = 'discover/tv?';

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

  set setMyApiKey(api_key: string) {
    this.baseDiscoverMovie.api_key = api_key;
    this.baseDiscoverTv.api_key = api_key;
    this.baseSearchMovie.api_key = api_key;
  }

  constructor(
    private readonly store: Store,
    private readonly http: HttpClient,
    @Inject(MOVIEIMGBASEURL) private readonly baseMovieImage: string,
    @Inject(TMDBBASEURL) private readonly tmdbBaseUrl: string
  ) {}

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

  handleScrol() {
    const discover = { ...this.baseDiscoverMovie, page: ++this.currentPage };
    let url = [this.tmdbBaseUrl, this.discoverMoviePath].join('/');

    Object.entries(discover).forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });

    this.store.dispatch(TmdbActions.SendHandleScrolMovie({ url }));
  }

  getMovieImagePath(path: string, quality: string): string {
    return [this.baseMovieImage, quality, path].join('/');
  }

  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ For Resolver
  getMovie(id: number): Observable<Movie> {
    if (this.baseDiscoverMovie.api_key) {
      const url = `${[this.tmdbBaseUrl, this.moviePath, id].join(
        '/'
      )}?api_key=${this.baseDiscoverMovie.api_key}`;
      return this.http.get<Movie>(url);
    } else {
      // expected err;
      return this.http.get<Movie>('');
    }
  }
  getVideo(id: number) {
    if (this.baseDiscoverMovie.api_key) {
      const url = [
        this.tmdbBaseUrl,
        this.moviePath,
        id,
        `videos?api_key=${this.baseDiscoverMovie.api_key}`,
      ].join('/');
      return this.http.get(url);
    } else {
      // expected err;
      return this.http.get('');
    }
  }
  getCredits(id: number): Observable<Credit> {
    if ((this.baseDiscoverMovie.api_key, id)) {
      const url = `${[this.tmdbBaseUrl, this.moviePath, id, 'credits'].join(
        '/'
      )}?api_key=${this.baseDiscoverMovie.api_key}`;

      return this.http.get<Credit>(url);
    } else {
      // expected err;
      return this.http.get<Credit>('');
    }
  }
  getPosters(id: number): Observable<MovieImage> {
    if ((this.baseDiscoverMovie.api_key, id)) {
      const url = `${[this.tmdbBaseUrl, this.moviePath, id, 'images'].join(
        '/'
      )}?api_key=${this.baseDiscoverMovie.api_key}`;

      return this.http.get<MovieImage>(url);
    } else {
      // expected err;
      return this.http.get<MovieImage>('');
    }
  }

  // getDiscoverTV(search: DiscoverTv) {
  //   const discover = { ...this.baseDiscoverTv, ...search };
  //   let url = [this.tmdbBaseUrl, this.discoverTvPath].join('/');

  //   Object.entries(discover).forEach(([key, value]) => {
  //     url += `&${key}=${value}`;
  //   });
  //   return this.http.get(url).pipe(map((tv: any) => tv.results));
  // }
}

/**
 * 1. To get the config data like image base urls
 * https://api.themoviedb.org/3/configuration?api_key=<APIKEY>
 *
 * 2. To fetch a list of movies based on a keyword
 * https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>
 *
 * 3. To fetch more details about a movie
 * https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>
 */
