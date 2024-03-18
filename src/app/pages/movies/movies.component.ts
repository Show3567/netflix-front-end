import {
  AfterViewInit,
  Component,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, Subscription } from 'rxjs';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';

import { DiscoverMovie } from 'src/app/services/interfaces/discoverMovies.interface';
import { DiscoverTv } from 'src/app/services/interfaces/discoverTv.interface';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Movie } from 'src/app/services/interfaces/movie.interface';
import { RouterScrollService } from 'src/app/services/scroll/router-scroll.service';
import { ProdTitle } from 'src/app/core/core.module';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  movies$!: Observable<Movie[]>;
  recommend: Movie[] = [];
  showSearchForm = true;
  showRecommendImg: string = '';
  noRecommendImg = 'src/assets/video/VGA-no-signal-image.jpeg';
  finished = false;

  // movies: any = [];
  private scrollerSubscription = new Subscription();

  // @ViewChild(CdkVirtualScrollViewport, { static: true })
  // scorller!: CdkVirtualScrollViewport;

  private baseSearchMovie: DiscoverMovie = {
    page: 1,
    year: 2024,
  };
  private baseSearchTv: DiscoverTv = {
    page: 1,
  };

  constructor(
    private readonly tmdbService: TmdbService,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly routerScroll: RouterScrollService,
    @Inject(ProdTitle) private readonly prodTitle: string // private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-Movies`);

    this.tmdbService.getDiscoverMovie(this.baseSearchMovie).subscribe();
    this.movies$ = this.tmdbService.movieListObs$;
    // this.tmdbService.movieListObs$.subscribe((data) => {
    //   console.log(data);
    //   this.movies = data;
    // });

    this.tmdbService.recommendListObs$.subscribe((recom) => {
      this.recommend = [...recom];
      if (this.recommend.length && this.recommend[0].id) {
        this.handleHoverRecommend(this.recommend[0].id);
      }
    });

    //& ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~backto the recorded position
    // const position = this.routerScroll.positions.movies;
    // if (position) {
    //   setTimeout(() => {
    //     window.scrollTo(...position);
    //   });
    // }
  }
  ngAfterViewInit(): void {
    // this.scrollerSubscription = this.scorller
    //   .elementScrolled()
    //   .pipe(
    //     map(() => {
    //       return this.scorller.measureScrollOffset('bottom');
    //     }),
    //     pairwise(),
    //     filter(([x, y]) => y < x && y < 40),
    //     throttleTime(200)
    //   )
    //   .subscribe((_) => {
    //     this.zone.run(() => {
    //       this.onScroll();
    //     });
    //   }); // https://www.youtube.com/watch?v=cUNmtRNc-8s&t=2s

    // throw new Error('Method not implemented.');
    const position = this.routerScroll.positions.movies;
    if (position) {
      window.scrollTo(...position);
    }
  }
  ngOnDestroy(): void {
    this.scrollerSubscription.unsubscribe();
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
    this.router.navigate(['/movies', id]);
  }

  trackByFn(i: number, item: Movie) {
    return item.id;
  }

  //& ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Switch Movie & TV
  switchToMoiveList() {
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
}
