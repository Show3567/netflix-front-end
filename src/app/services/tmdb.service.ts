import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DiscoverMovie } from './interfaces/discoverMovies.interface';
import { map } from 'rxjs/operators';
import { TMDBAPIKEY } from '../app.module';
import { DiscoverTv } from './interfaces/discoverTv.interface';
import { Observable } from 'rxjs';
import { Movie } from './interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
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

  private readonly tmdbBaseUrl = 'https://api.themoviedb.org/3';
  private readonly baseMovieImage = 'https://image.tmdb.org/t/p';
  private readonly discoverMoviePath = 'discover/movie?';
  private readonly discoverTvPath = 'discover/tv?';
  private readonly moviePath = 'movie';

  private readonly baseDiscoverMovie: DiscoverMovie = {
    api_key: this.myApiKey,
    page: 1,
    language: 'en-US',
    sort_by: 'release_date.desc',
    // sort_by: 'popularity.desc',
    with_watch_monetization_types: 'flatrate',
    include_adult: false,
    include_video: false,
  };
  private readonly baseDiscoverTv: DiscoverTv = {
    api_key: this.myApiKey,
    page: 1,
    language: 'en-US',
  };

  constructor(
    private http: HttpClient,
    @Inject(TMDBAPIKEY) private readonly myApiKey: string
  ) {}

  getDiscoverMovie(search: DiscoverMovie) {
    const discover = { ...this.baseDiscoverMovie, ...search };
    let url = [this.tmdbBaseUrl, this.discoverMoviePath].join('/');
    Object.entries(discover).forEach(([key, value]) => {
      url += `&${key}=${'' + value}`;
    });
    return this.http.get(url).pipe(map((movies: any) => movies.results));
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
    const url = `${[this.tmdbBaseUrl, this.moviePath, id].join('/')}?api_key=${
      this.baseDiscoverMovie.api_key
    }`;
    return this.http.get<Movie>(url);
  }

  getVideo(id: number) {
    const url = [
      this.tmdbBaseUrl,
      this.moviePath,
      id,
      `videos?api_key=${this.baseDiscoverMovie.api_key}`,
    ].join('/');
    return this.http.get(url);
  }
}
