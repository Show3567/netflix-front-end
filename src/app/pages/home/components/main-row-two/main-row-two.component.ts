import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  input,
} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule, NgClass],
  selector: 'app-main-row-two',
  templateUrl: './main-row-two.component.html',
  styleUrls: ['./main-row-two.component.scss'],
})
export class MainRowTwoComponent implements OnInit, AfterViewInit {
  header = input('');
  content = input('');
  templatePic = input('');
  videoIncome = input.required();

  @ViewChild('video_holder', { static: true })
  videoHolder?: ElementRef;

  video = '';
  video_class = '';
  baseAssets = '/assets/home/';

  constructor() {}

  ngOnInit(): void {
    this.video = this.baseAssets + this.videoIncome();
  }
  ngAfterViewInit(): void {
    this.videoHolder?.nativeElement
      .play()
      .catch((error: any) =>
        console.error('Error attempting to play video:', error),
      );
  }
}
