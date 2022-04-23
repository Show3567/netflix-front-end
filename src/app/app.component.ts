import { Component, OnInit } from '@angular/core';
import { DiscoverMovie } from './services/interfaces/discoverMovies.interface';
import { TmdbService } from './services/tmdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    const search: DiscoverMovie = {
      page: 1,
      year: 2022,
      include_video: true,
    };
    this.tmdbService.getDiscoverMovie(search).subscribe((data) => {
      console.log(data);
    });
  }
}
