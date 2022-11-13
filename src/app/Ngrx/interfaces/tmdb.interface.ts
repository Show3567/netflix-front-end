import { Movie } from 'src/app/services/interfaces/movie.interface';

export interface TmdbState {
  movieList: Movie[];
  recommendList: Movie[];
  err: string;
}
