import { AfterViewInit, Component, Inject, OnInit, Pipe } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DiscoverMovie } from 'src/app/services/interfaces/discoverMovies.interface';
import { DiscoverTv } from 'src/app/services/interfaces/discoverTv.interface';
import { Movie } from 'src/app/services/interfaces/movie.interface';
import { ProdTitle } from 'src/app/core/core.module';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';
import { TmdbNgrxService } from 'src/app/Ngrx/Tmdb/tmdb-ngrx.service';

import * as TmdbSelectors from 'src/app/Ngrx/Tmdb/tmdb.selectors';
import * as PositionSelector from 'src/app/Ngrx/Scroll/scroll.selector';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit {
  movies$!: Observable<Movie[]>;
  recommend: Movie[] = [];
  showSearchForm = true;
  showRecommendImg: string = '';
  noRecommendImg = 'src/assets/video/VGA-no-signal-image.jpeg';
  finished = false;

  private baseSearchMovie: DiscoverMovie = {
    page: 1,
    year: 2023,
  };
  private baseSearchTv: DiscoverTv = {
    page: 1,
  };

  constructor(
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly tmdbService: TmdbNgrxService,
    private readonly authService: AuthNgrxService,
    private readonly store: Store,
    @Inject(ProdTitle) private readonly prodTitle: string
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-Movies`);

    this.tmdbService.getDiscoverMovie(this.baseSearchMovie);
    this.movies$ = this.store.select(TmdbSelectors.getMovies);

    this.store.select(TmdbSelectors.getCommendList).subscribe((recom) => {
      this.recommend = [...recom];
      if (this.recommend.length && this.recommend[0].id) {
        this.handleHoverRecommend(this.recommend[0].id);
      }
    });
  }
  ngAfterViewInit(): void {
    //& ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~backto the recorded position
    const position = this.authService.getCurValFromObs(
      this.store.select(PositionSelector.selectScrollPosition)
    );

    if (position.movies) {
      window.scrollTo(...position.movies);
    }
  }

  handleHoverRecommend(id: number) {
    const movie = this.recommend.find((item: Movie | any) => +item.id === +id);
    this.showRecommendImg =
      movie && movie.backdrop_path
        ? this.tmdbService.getMovieImagePath(movie.backdrop_path, 'w1280')
        : this.noRecommendImg;
  }

  onScroll() {
    this.tmdbService.handleScrol();
    console.log('onScrolling...');
  }

  navigateMovie(id: number) {
    this.router.navigate(['/movies', id]);
  }

  trackByFn(i: number, item: Movie) {
    return item.id;
  }
  //& ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Switch Movie & TV
  switchToMoiveList() {
    this.tmdbService.handleScrol();
    // const value = this.getCurValFromObs(
    //   this.store.select(AuthSelectors.getUserAuth)
    // );
    // console.log(value);
    // window.scrollTo(0, 10000);
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
  private getCurValFromObs(obs: Observable<any>): any {
    let value: any;
    obs.pipe(take(1)).subscribe((val) => {
      value = val;
    });
    return value;
  }
}
