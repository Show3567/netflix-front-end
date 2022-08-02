import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { YouTubePlayer } from '@angular/youtube-player';
import { ActivatedRoute } from '@angular/router';

import { ProdTitle } from 'src/app/app.module';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Video } from '../../services/interfaces/video.interface';
import { MovieDetail } from '../../services/interfaces/movie-detail.interface';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @ViewChild(YouTubePlayer, { static: true }) youTubePlayer!: YouTubePlayer;

  hasposter_img = true;
  hasbackdrop_img = true;
  poster_img_high = '';
  backdrop_img_high = '';
  isMuted = false;

  movie: MovieDetail = {};
  movieVideos: Video[] = [];
  companies_icons: string[] = [];

  size = {
    height: visualViewport.height,
    width: visualViewport.width,
  };

  constructor(
    private tmdbService: TmdbService,
    private activatedRoute: ActivatedRoute,
    private readonly titleService: Title,
    @Inject(ProdTitle) private readonly prodTitle: string
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-MovieItem`);

    const videos = this.activatedRoute.snapshot.data['videos'];
    if (videos && videos.results) {
      this.movieVideos = [...videos.results];
    }
    const movie = this.activatedRoute.snapshot.data['movie'];
    this.movie = { ...movie };

    this.setSources();
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
      const videoOut: any = this.movieVideos.shift();
      this.movieVideos.push(videoOut);
    } else if (direction === 'right' && this.movieVideos.length) {
      const videoOut: any = this.movieVideos.pop();
      this.movieVideos.unshift(videoOut);
    }
  }

  /* ~~~~~~~~~~~~ helper ~~~~~~~~~~~~ */
  private setSources() {
    if (this.movie.production_companies) {
      this.movie.production_companies.forEach((company: any) => {
        company.logo_path !== null &&
          this.companies_icons.push(
            this.tmdbService.getMovieImagePath(company.logo_path, 'w500')
          );
      });
    }
    if (this.movie.backdrop_path) {
      this.hasbackdrop_img = true;
      this.backdrop_img_high = this.tmdbService.getMovieImagePath(
        this.movie.backdrop_path,
        'original'
      );
    } else this.hasbackdrop_img = false;
    if (this.movie.poster_path) {
      this.hasposter_img = true;
      this.poster_img_high = this.tmdbService.getMovieImagePath(
        this.movie.poster_path,
        'w780'
      );
    } else this.hasposter_img = false;
  }
}
