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
import { SearchMovieReturn } from '../interfaces/searchMovidReturn.interface';

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
    page: 1,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false,
    include_video: false,
    with_watch_monetization_types: 'flatrate',
  };
  private baseSearchMovie: SearchMovieDto = {
    query: '',
    language: 'en-US',
    page: 1,
  };
  private readonly baseDiscoverTv: DiscoverTv = {
    page: 1,
    language: 'en-US',
  };

  // ~~~~~~~ lifecycle ~~~~~~~
  constructor(private readonly http: HttpClient) {}

  // ~~~~~~~ methods ~~~~~~~
  getDiscoverMovie(search: DiscoverMovie) {
    const discoverMovies = { ...this.baseDiscoverMovie, ...search };
    let url = [this.tmdbBaseUrl, this.discoverMoviePath].join('/');

    Object.entries(discoverMovies).forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });

    return this.http.get<SearchMovieReturn>(url).pipe(
      tap((data) => {
        if (!this.movieList.length) {
          this.movieList = [...(data.results as Movie[])];
          this.movieList$.next(this.movieList);

          this.recommendList = [...this.movieList.slice(0, 7)];
          this.recommendList$.next(this.recommendList);
        }
      })
    );
  }

  searchMovie(keyword: string) {
    const query = { ...this.baseSearchMovie, query: keyword };
    let url = [this.tmdbBaseUrl, this.searchMoviePath].join('/');

    Object.entries(query).forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });

    return this.http.get<SearchMovieReturn>(url).pipe(
      tap((data) => {
        if (!this.movieList.length) {
          this.movieList = [...(data.results as Movie[])];
        } else {
          this.movieList = [...this.movieList, ...(data.results as Movie[])];
        }
        this.movieList$.next(this.movieList);
      })
    );
  }

  handleScrol() {
    const discover = { ...this.baseDiscoverMovie, page: ++this.currentPage };
    let url = [this.tmdbBaseUrl, this.discoverMoviePath].join('/');

    Object.entries(discover).forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });

    return this.http.get<SearchMovieReturn>(url).pipe(
      tap((data) => {
        this.movieList = [...this.movieList, ...(data.results as Movie[])];
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
      url += `&${key}=${value}`;
    });
    return this.http.get(url).pipe(map((tv: any) => tv.results));
  }

  getMovieImagePath(path: string, quality: string): string {
    return [this.baseMovieImage, quality, path].join('/');
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      [this.tmdbBaseUrl, this.moviePath, id].join('/')
    );
  }

  getCredits(id: number): Observable<Credit> {
    return this.http.get<Credit>(
      [this.tmdbBaseUrl, this.moviePath, id, 'credits'].join('/')
    );
  }

  getPosters(id: number): Observable<MovieImage> {
    return this.http.get<MovieImage>(
      [this.tmdbBaseUrl, this.moviePath, id, 'images'].join('/')
    );
  }

  getVideo(id: number) {
    return this.http.get(
      [this.tmdbBaseUrl, this.moviePath, id, 'video'].join('/')
    );
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
