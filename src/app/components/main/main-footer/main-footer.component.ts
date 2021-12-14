import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit {
  linkList = [
    'FAQ',
    'Help Center',
    'Account',
    'Media Center',
    'Investor Relations',
    'Jobs',
    'Redeem Gift Cards',
    'By Gift Cards',
    'Ways to Watch',
    'Terms of Use',
    'Privacy',
    'Cookie Preferences',
    'Corporate Information',
    'Contact Us',
    'Speed Test',
    'Legal Notices',
    'Only on Netflix',
  ];

  constructor() {}

  ngOnInit(): void {}
}
