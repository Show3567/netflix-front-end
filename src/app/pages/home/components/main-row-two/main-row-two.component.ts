import { NgClass, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    imports: [SharedModule, NgClass],
    selector: 'app-main-row-two',
    templateUrl: './main-row-two.component.html',
    styleUrls: ['./main-row-two.component.scss']
})
export class MainRowTwoComponent implements OnInit, AfterViewInit {
  header = input('');
  content = input('');
  templatePic = input('');
  videoIncome = input.required();

  @ViewChild('video_holder', { static: true })
  videoHolder?: ElementRef<HTMLVideoElement>;

  private isBrowser!: boolean;
  private readonly platform = inject(PLATFORM_ID);

  video = '';
  video_class = '';
  baseAssets = '/assets/home/';

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platform);
  }

  ngOnInit(): void {
    this.video = this.baseAssets + this.videoIncome();
  }
  ngAfterViewInit(): void {
    if (this.isBrowser && this.videoHolder) {
      this.videoHolder.nativeElement
        .play()
        .catch((error: any) =>
          console.error('Error attempting to play video:', error),
        );
    }
  }
}
