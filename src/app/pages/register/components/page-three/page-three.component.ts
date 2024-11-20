import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    imports: [SharedModule],
    selector: 'app-page-three',
    templateUrl: './page-three.component.html',
    styleUrls: ['./page-three.component.scss']
})
export class PageThreeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
