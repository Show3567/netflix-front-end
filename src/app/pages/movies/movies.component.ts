import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Signal,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DiscoverMovie } from 'src/app/services/interfaces/discoverMovies.interface';
import { DiscoverTv } from 'src/app/services/interfaces/discoverTv.interface';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Movie } from 'src/app/services/interfaces/movie.interface';

import { RouterScrollService } from 'src/app/services/scroll/router-scroll.service';
import { ProdTitle } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemComponent } from './components/item/item.component';
import { RecommendComponent } from './components/recommend/recommend.component';

@Component({
  standalone: true,
  imports: [SharedModule, ScrollingModule, ItemComponent, RecommendComponent],
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  movieSignal: Signal<Movie[][]> = computed(() => {
    const movies = this.tmdbService.movieSignal();

    const list: Movie[][] = [];
    const movieList = [...movies];
    while (movieList.length) {
      const arr: Movie[] = [];
      for (let i = 0; i < 3; i++) {
        const movie = movieList.shift();
        if (movie) {
          arr.push(movie);
        } else break;
      }
      list.push(arr);
    }
    return list;
  });

  recommendSignal!: Signal<Movie[]>;
  showSearchForm = signal(true);

  noRecommendImg = '/assets/video/VGA-no-signal-image.jpeg';
  finished = false;
  currentId = signal(0);
  showRecommendImg = computed(() => {
    const movie = this.recommendSignal().find(
      (item: Movie | any) => +item.id === +this.currentId(),
    );
    return movie && movie.backdrop_path
      ? this.tmdbService.getMovieImagePath('w1280', movie.backdrop_path)
      : this.noRecommendImg;
  });
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  private baseSearchMovie: DiscoverMovie = {
    page: 1,
    year: 2024,
  };
  private baseSearchTv: DiscoverTv = {
    page: 1,
  };
  private isloading = signal(false);
  private readonly scrollPositionKey = 'movielist';
  private notifier = new Subject();

  get itemSizePx(): number {
    return this.remToPx(33);
  }

  constructor(
    private readonly tmdbService: TmdbService,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly routerScroll: RouterScrollService,
    @Inject(ProdTitle) private readonly prodTitle: string, // private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-Movies`);

    this.tmdbService
      .getDiscoverMovie(this.baseSearchMovie)
      .pipe(takeUntil(this.notifier))
      .subscribe((e) => {
        this.handleHoverRecommend(this.tmdbService.recommendSignal()[0].id);
      });

    this.recommendSignal = this.tmdbService.recommendSignal;

    this.router.events.pipe(takeUntil(this.notifier)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.setPosition();
      }
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const position = this.routerScroll.positions[this.scrollPositionKey];
      if (position) {
        this.viewport.scrollToOffset(position[0]);
      }
    }, 50);
  }
  ngOnDestroy(): void {
    this.setPosition();
    this.stopObs();
  }

  handleHoverRecommend(id: number) {
    this.currentId.set(id);
  }
  onScroll() {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    const threshold = 2;

    if (end >= total - threshold && !this.isloading()) {
      this.isloading.set(true);
      this.tmdbService
        .handleScrol()
        .pipe(takeUntil(this.notifier))
        .subscribe((movies) => {
          this.isloading.set(false);
        });
    }
  }
  navigateMovie(id: number) {
    this.router.navigate(['/movies', id]);
  }
  trackByFn(i: number, item: Movie[]) {
    return item[0].id;
  }

  private setPosition() {
    this.routerScroll.setPositionState(
      this.scrollPositionKey,
      this.viewport.measureScrollOffset(),
      0,
    );
  }
  private remToPx(rem: number): number {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }
  private stopObs() {
    this.notifier.next(null);
    this.notifier.complete();
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
