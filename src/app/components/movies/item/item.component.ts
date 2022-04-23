import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() movie: any;
  backdrop_img_url = '';
  poster_img_url = '';

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    console.log(this.movie);

    this.backdrop_img_url = this.tmdbService.getMovieImage(
      this.movie.backdrop_path
    );
    this.poster_img_url = this.tmdbService.getMovieImage(
      this.movie.poster_path
    );
  }
}
