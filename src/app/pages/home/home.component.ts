import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProdTitle } from 'src/app/app.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  constructor(
    private readonly titleService: Title,
    @Inject(ProdTitle) private readonly prodTitle: string
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-Home`);
  }
}
