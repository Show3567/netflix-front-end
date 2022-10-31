import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DiscoverMovie } from '../interfaces/discoverMovies.interface';
import { DiscoverTv } from '../interfaces/discoverTv.interface';
import { Movie } from '../interfaces/movie.interface';
import { Credit } from '../interfaces/credit.interface';
import { MovieImage } from '../interfaces/poster.interface';
import { SearchMovieDto } from '../interfaces/searchMovieDto.interface';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly tmdbBaseUrl = 'https://api.themoviedb.org/3';
  private readonly baseMovieImage = 'https://image.tmdb.org/t/p';
  private readonly discoverMoviePath = 'discover/movie?';
  private readonly searchMoviePath = 'search/movie?';
  private readonly discoverTvPath = 'discover/tv?';
  private readonly moviePath = 'movie';

  private movieList: Movie[] = [];
  private movieList$ = new BehaviorSubject(this.movieList);
  movieListObs$ = this.movieList$.asObservable();

  private recommendList: Movie[] = [];
  private recommendList$ = new BehaviorSubject(this.recommendList);
  recommendListObs$ = this.recommendList$.asObservable();

  private searchedMovieList: Movie[] = [];
  private searchedMovieList$ = new BehaviorSubject(this.searchedMovieList);
  searchedMovieListObs$ = this.searchedMovieList$.asObservable();

  private showMovieList: boolean = true;
  private showMovieList$ = new BehaviorSubject(this.showMovieList);
  showMovieObs$ = this.showMovieList$.asObservable();

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
  }

  // ~~~~~~~ lifecycle ~~~~~~~
  constructor(
    // @Inject(TMDBAPIKEY) private readonly myApiKey: string,
    private readonly http: HttpClient
  ) {}

  // ~~~~~~~ methods ~~~~~~~
  getDiscoverMovie(search: DiscoverMovie) {
    const query = { ...this.baseDiscoverMovie, ...search };
    let url = [this.tmdbBaseUrl, this.discoverMoviePath].join('/');
    Object.entries(query).forEach(([key, value]) => {
      url += `&${key}=${'' + value}`;
    });
    return this.http.get(url).pipe(
      tap((data: any) => {
        if (!this.movieList.length) {
          this.movieList = [...data.results];
          this.movieList$.next(this.movieList);

          this.recommendList = [...this.movieList.slice(0, 7)];
          this.recommendList$.next(this.recommendList);
        }
      })
    );
  }
  searchMovie(search: SearchMovieDto) {
    const query = { ...this.searchMovie, ...search };
    let url = [this.tmdbBaseUrl, this.searchMoviePath].join('/');
    Object.entries(query).forEach(([key, value]) => {
      url += `&${key}=${'' + value}`;
    });
    return this.http.get(url).pipe(
      tap((data: any) => {
        if (!this.movieList.length) {
          this.movieList = [...data.results];
        } else {
          this.movieList = [...this.movieList, ...data.results];
        }
        this.movieList$.next(this.movieList);
      })
    );
  }

  handleScrol() {
    const discover = { ...this.baseDiscoverMovie, page: ++this.currentPage };
    let url = [this.tmdbBaseUrl, this.discoverMoviePath].join('/');
    Object.entries(discover).forEach(([key, value]) => {
      url += `&${key}=${'' + value}`;
    });

    return this.http.get(url).pipe(
      tap((data: any) => {
        this.movieList = [...this.movieList, ...data.results];
        this.movieList$.next(this.movieList);

        this.recommendList = [...this.movieList.slice(0, 7)];
        this.recommendList$.next(this.recommendList);
      })
    );
  }

  getDiscoverTV(search: DiscoverTv) {
    const discover = { ...this.baseDiscoverTv, ...search };
    let url = [this.tmdbBaseUrl, this.discoverTvPath].join('/');
    Object.entries(discover).forEach(([key, value]) => {
      url += `&${key}=${'' + value}`;
    });
    return this.http.get(url).pipe(map((tv: any) => tv.results));
  }

  getMovieImagePath(path: string, quality: string): string {
    return [this.baseMovieImage, quality, path].join('/');
  }

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
