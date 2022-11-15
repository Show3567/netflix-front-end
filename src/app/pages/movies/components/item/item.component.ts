import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { TmdbNgrxService } from 'src/app/Ngrx/Tmdb/tmdb-ngrx.service';
import { PositionKey } from '../../movies.module';

import * as PositionAction from 'src/app/Ngrx/Scroll/scroll.action';
import { Movie } from 'src/app/services/interfaces/movie.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() movie!: any;
  hasPoster_img = true;
  poster_img_high = '';
  year!: number;

  isLoading = false;

  constructor(
    private readonly tmdbService: TmdbNgrxService,
    private readonly router: Router,
    private readonly store: Store,
    @Inject(PositionKey) private readonly moviesPositionKey: string
  ) {}

  ngOnInit(): void {
    this.year = this.movie.release_date
      ? new Date(this.movie.release_date).getFullYear()
      : new Date(this.movie.first_air_date).getFullYear();

    if (this.movie.poster_path) {
      this.hasPoster_img = true;
      this.poster_img_high = this.tmdbService.getMovieImagePath(
        this.movie.poster_path,
        'w780'
      );
    } else {
      this.hasPoster_img = false;
    }
  }

  gotoDetailPage() {
    this.isLoading = true;
    this.router.navigate(['/movies', this.movie.id]);
    // this.routerScroll.setPositionState('movies', 0, window.scrollY);
    this.store.dispatch(
      PositionAction.RecordScrollPosition({
        name: this.moviesPositionKey,
        x: 0,
        y: window.scrollY,
      })
    );
    console.log(window.scrollY);
  }
}
