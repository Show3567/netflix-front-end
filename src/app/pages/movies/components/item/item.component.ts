import { Component, Input, OnInit, computed, input } from '@angular/core';
import { Router } from '@angular/router';

import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { RouterScrollService } from 'src/app/services/scroll/router-scroll.service';
import { Movie } from 'src/app/services/interfaces/movie.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgStyle, UpperCasePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [SharedModule, NgStyle, UpperCasePipe],
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  movie = input.required<Movie>();
  hasPoster_img = true;

  poster_img_high = computed(() => {
    const path = this.movie().poster_path;
    if (path) {
      this.hasPoster_img = true;
      return this.tmdbService.getMovieImagePath('w780', path);
    } else {
      this.hasPoster_img = false;
      return '';
    }
  });
  year = computed(() => {
    const date = this.movie().release_date;
    const air_date = this.movie().first_air_date;
    if (date) {
      return new Date(date).getFullYear();
    } else if (air_date) {
      return new Date(air_date).getFullYear();
    }
    return '';
  });
  isLoading = false;

  constructor(
    private tmdbService: TmdbService,
    private readonly router: Router,
  ) {}

  gotoDetailPage() {
    this.isLoading = true;
    this.router.navigate(['/movies', this.movie().id]);
  }
}
