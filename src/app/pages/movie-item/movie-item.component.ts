import { Component, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { YouTubePlayer } from '@angular/youtube-player';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @ViewChild(YouTubePlayer, { static: true }) youTubePlayer!: YouTubePlayer;

  isMuted: boolean = false;

  movie: any = {};
  movieVideos: any = [];

  size = {
    height: visualViewport.height,
    width: visualViewport.width,
  };

  constructor(
    private tmdbService: TmdbService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((data: any) => data.params.id),
        tap((id: any) => {
          this.tmdbService.getVideo(+id).subscribe((videos: any) => {
            if (videos && videos.results) {
              this.movieVideos = [...videos.results];
              console.log(this.movieVideos);
            }
          });
          this.tmdbService.getMovie(+id).subscribe((movie: any) => {
            this.movie = { ...movie };
            console.log(this.movie);
          });
        })
      )
      .subscribe();
  }

  handleMute() {
    if (this.isMuted) {
      this.isMuted = false;
      this.youTubePlayer.unMute();
    } else {
      this.isMuted = true;
      this.youTubePlayer.mute();
    }
  }

  handleError() {}
}
