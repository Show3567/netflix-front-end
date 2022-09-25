import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('mainContent')
  private mainContentElement!: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {}

  onActivate(e: any) {}
}
