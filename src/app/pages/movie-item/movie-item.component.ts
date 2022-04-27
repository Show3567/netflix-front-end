import { Component, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { YouTubePlayer } from '@angular/youtube-player';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @ViewChild(YouTubePlayer, { static: true }) youTubePlayer!: YouTubePlayer;
  poster_img_high: string = '';
  backdrop_img_high: string = '';
  isMuted: boolean = false;

  movie: any = {};
  movieVideos: any = [];
  companies_icons: string[] = [];

  size = {
    height: visualViewport.height,
    width: visualViewport.width,
  };

  constructor(
    private tmdbService: TmdbService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((data: any) => data.params.id),
        tap((id: any) => {
          this.tmdbService.getVideo(+id).subscribe((videos: any) => {
            if (videos && videos.results) {
              this.movieVideos = [...videos.results];
              // console.log(this.movieVideos);
            }
          });
          this.tmdbService.getMovie(+id).subscribe((movie: any) => {
            this.movie = { ...movie };
            console.log(this.movie);

            this.movie.production_companies.forEach((company: any) => {
              company.logo_path !== null &&
                this.companies_icons.push(
                  this.tmdbService.getMovieImagePath(company.logo_path, 'w500')
                );
            });
            this.backdrop_img_high = this.tmdbService.getMovieImagePath(
              this.movie.backdrop_path,
              'original'
            );
            this.poster_img_high = this.tmdbService.getMovieImagePath(
              this.movie.poster_path,
              'w780'
            );
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

  switchVideo(direction: string) {
    if (direction === 'left' && this.movieVideos.length) {
      const videoOut = this.movieVideos.shift();
      this.movieVideos.push(videoOut);
    } else if (direction === 'right' && this.movieVideos.length) {
      const videoOut = this.movieVideos.pop();
      this.movieVideos.unshift(videoOut);
    }
    console.log(this.movieVideos[0]);
  }
}
