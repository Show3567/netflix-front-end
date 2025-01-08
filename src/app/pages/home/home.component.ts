import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProdTitle } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainQuestionsComponent } from './components/main-questions/main-questions.component';
import { MainRowOneComponent } from './components/main-row-one/main-row-one.component';
import { MainRowThreeComponent } from './components/main-row-three/main-row-three.component';
import { MainRowTwoComponent } from './components/main-row-two/main-row-two.component';

@Component({
  standalone: true,
  imports: [
    SharedModule,
    MainQuestionsComponent,
    MainRowOneComponent,
    MainRowThreeComponent,
    MainRowTwoComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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
    @Inject(ProdTitle) private readonly prodTitle: string,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-Home`);
  }
  ngOnDestroy(): void {}
}
