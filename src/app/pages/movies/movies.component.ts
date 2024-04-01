import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Signal,
  computed,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  movieSignal!: Signal<Movie[]>;
  recommendSignal!: Signal<Movie[]>;
  showSearchForm = true;
  // showRecommendImg: string = '';
  currentId = signal(0);
  noRecommendImg = 'src/assets/video/VGA-no-signal-image.jpeg';
  finished = false;
  showRecommendImg = computed(() => {
    const movie = this.recommendSignal().find(
      (item: Movie | any) => +item.id === +this.currentId(),
    );
    console.log(movie?.backdrop_path);
    return movie && movie.backdrop_path
      ? this.tmdbService.getMovieImagePath('w1280', movie.backdrop_path)
      : this.noRecommendImg;
  });

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
    @Inject(ProdTitle) private readonly prodTitle: string, // private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-Movies`);

    this.tmdbService.getDiscoverMovie(this.baseSearchMovie).subscribe((e) => {
      this.handleHoverRecommend(this.tmdbService.recommendSignal()[0].id);
    });
    this.movieSignal = this.tmdbService.movieSignal;
    this.recommendSignal = this.tmdbService.recommendSignal;
  }
  ngAfterViewInit(): void {
    // this.handleHoverRecommend(this.tmdbService.recommendSignal()[0].id);
    const position = this.routerScroll.positions.movies;
    if (position) {
      window.scrollTo(...position);
    }
  }
  ngOnDestroy(): void {}

  handleHoverRecommend(id: number) {
    this.currentId.set(id);
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
