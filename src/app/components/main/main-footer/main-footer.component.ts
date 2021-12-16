import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit {
  @Input() linkList: string[] = [];
  @Input() backgroundColor: string = 'black';

  constructor() {}

  ngOnInit(): void {}
}
