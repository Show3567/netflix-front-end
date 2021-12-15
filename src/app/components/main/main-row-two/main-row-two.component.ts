import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-row-two',
  templateUrl: './main-row-two.component.html',
  styleUrls: ['./main-row-two.component.scss'],
})
export class MainRowTwoComponent implements OnInit {
  @Input() header = '';
  @Input() content = '';
  @Input() templatePic = '';
  @Input() videoIncome = '';

  @ViewChild('video_holder', { static: true })
  videoHolder?: ElementRef;

  video = '';
  video_class = '';
  baseAssets = '../../../../assets/home/';

  constructor() {}

  ngOnInit(): void {
    this.video = this.baseAssets + this.videoIncome;
    this.videoHolder?.nativeElement.play();
  }
}
