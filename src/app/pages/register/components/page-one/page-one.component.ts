import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    imports: [SharedModule],
    selector: 'app-page-one',
    templateUrl: './page-one.component.html',
    styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit {
  linkList = [
    'FAQ',
    'Help Center',
    'Terms of Use',
    'Privacy',
    'Cookie Preferences',
    'Corporate Information',
  ];
  backgroundColor = 'rgb(243, 243, 243)';

  constructor() {}

  ngOnInit(): void {}
}
