import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { YouTubePlayer } from '@angular/youtube-player';
import { ActivatedRoute, Router } from '@angular/router';

import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Video } from 'src/app/services/interfaces/video.interface';
import { MovieDetail } from 'src/app/services/interfaces/movie-detail.interface';
import { Cast } from 'src/app/services/interfaces/credit.interface';
import { Backdrop, Poster } from 'src/app/services/interfaces/poster.interface';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from './components/movie-dialog/movie-dialog.component';
import { ProdTitle } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgStyle } from '@angular/common';
import { VideoItemComponent } from './components/video-item/video-item.component';

@Component({
  standalone: true,
  imports: [SharedModule, NgStyle, VideoItemComponent, MovieDialogComponent],
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
  type!: string | undefined;
  date!: string | undefined;

  movie!: MovieDetail;
  movieVideos: Video[] = [];
  companies_icons: string[] = [];
  actors: Cast[] = [];
  posters: Poster[] = [];

  // size = {
  //   height: visualViewport.height,
  //   width: visualViewport.width,
  // };

  constructor(
    private readonly tmdbService: TmdbService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly titleService: Title,
    private readonly router: Router,
    public dialog: MatDialog,
    @Inject(ProdTitle) private readonly prodTitle: string,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-MovieItem`);

    this.setSources();
    this.type = this.movie.genres?.map(({ name }) => name).join(',');
    this.date = this.movie.release_date?.split('-')[0];
  }
  //& ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Open a new Tag in browser
  openNewTab() {
    // if (this.movie.homepage) {
    //   window.open(this.movie.homepage, '_blank');
    // }
  }
  //& ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Transfer data into dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      data: {
        movieVideos: this.movieVideos,
        hasposter_img: this.hasposter_img,
        hasbackdrop_img: this.hasbackdrop_img,
        poster_img_high: this.poster_img_high,
        backdrop_img_high: this.backdrop_img_high,
      },
      backdropClass: 'backdropBackground',
      panelClass: 'my-panel',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  //& ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reset the source for view
  private setSources() {
    const videos = this.activatedRoute.snapshot.data['videos'];
    if (videos && videos.results) {
      this.movieVideos = [...videos.results];
    }
    this.movie = this.activatedRoute.snapshot.data['movie'];
    this.actors = this.activatedRoute.snapshot.data['credits'].map(
      (actor: Cast): Cast => {
        const profile_path = actor.profile_path
          ? this.tmdbService.getMovieImagePath('w500', actor.profile_path)
          : '';
        return { ...actor, profile_path };
      },
    );
    this.posters = this.activatedRoute.snapshot.data['posters']
      .map((backdrop: Backdrop): Backdrop => {
        const file_path = this.tmdbService.getMovieImagePath(
          'w500',
          backdrop.file_path,
        );
        return { ...backdrop, file_path };
      })
      .reverse();

    if (this.movie.production_companies) {
      this.movie.production_companies.forEach((company: any) => {
        company.logo_path !== null &&
          this.companies_icons.push(
            this.tmdbService.getMovieImagePath('w500', company.logo_path),
          );
      });
    }
    if (this.movie.backdrop_path) {
      this.hasbackdrop_img = true;
      this.backdrop_img_high = this.tmdbService.getMovieImagePath(
        'original',
        this.movie.backdrop_path,
      );
    } else this.hasbackdrop_img = false;
    if (this.movie.poster_path) {
      this.hasposter_img = true;
      this.poster_img_high = this.tmdbService.getMovieImagePath(
        'w780',
        this.movie.poster_path,
      );
    } else this.hasposter_img = false;
  }
  //& ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Youtube player can be controled by ViewChild
  handleMute() {
    if (this.isMuted) {
      this.isMuted = false;
      this.youTubePlayer.unMute();
    } else {
      this.isMuted = true;
      this.youTubePlayer.mute();
    }
  }
}
