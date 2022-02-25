import { Injectable } from '@angular/core';

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

  tmdbBaseUrl = 'https://api.themoviedb.org/3/';
  APIKEY = 'ac7e1f44cec0dd6e260391374208b0cc';

  constructor() {}
}
