import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    imports: [SharedModule],
    selector: 'app-video-item',
    templateUrl: './video-item.component.html',
    styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
