import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { slideInAnimation } from 'src/app/animation/router.anim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onActivate(e: any) {}
}
