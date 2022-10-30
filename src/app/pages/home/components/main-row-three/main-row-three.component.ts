import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-row-three',
  templateUrl: './main-row-three.component.html',
  styleUrls: ['./main-row-three.component.scss'],
})
export class MainRowThreeComponent implements OnInit {
  @Input() header = '';
  @Input() content = '';
  @Input() channel = '';

  constructor() {}

  ngOnInit(): void {}
}
