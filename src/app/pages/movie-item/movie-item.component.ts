import { Component, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @ViewChild(YouTubePlayer, { static: true }) youTubePlayer!: YouTubePlayer;

  isMuted: boolean = false;

  movieRef = {
    adult: false,
    backdrop_path: '/5P8SmMzSNYikXpxil6BYzJ16611.jpg',
    genre_ids: [80, 9648, 53],
    id: 414906,
    original_language: 'en',
    original_title: 'The Batman',
    overview:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    popularity: 17796.835,
    poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    release_date: '2022-03-01',
    title: 'The Batman',
    video: false,
    vote_average: 7.9,
    vote_count: 3500,
  };
  movie: any = {};
  movieVideo: any = {};

  size = {
    height: visualViewport.height,
    width: visualViewport.width,
  };

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getVideo(+this.movieRef.id).subscribe((video: any) => {
      if (video && video.results.length) {
        this.movieVideo = video.results[0];
      }
    });
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

  // createYouTubeIframe(name: string, key: string, site: string) {
  //   const videoUrl = `https://www.youtube.com/embed/${key}`;
  //   this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  // }
}
