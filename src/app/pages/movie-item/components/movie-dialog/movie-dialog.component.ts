import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Video } from 'src/app/services/interfaces/video.interface';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent implements OnInit {
  movieVideos: Video[] = [];
  hasposter_img = true;
  hasbackdrop_img = true;
  poster_img_high = '';
  backdrop_img_high = '';

  constructor(
    private readonly dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
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
}
