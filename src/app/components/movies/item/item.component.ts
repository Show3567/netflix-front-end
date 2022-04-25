import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() movie: any;
  poster_img_high = '';
  year!: number;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.year = this.movie.release_date
      ? new Date(this.movie.release_date).getFullYear()
      : new Date(this.movie.first_air_date).getFullYear();

    this.poster_img_high = this.tmdbService.getMovieImagePath(
      this.movie.poster_path,
      'w780'
    );
  }
}
