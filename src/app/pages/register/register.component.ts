import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProdTitle } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { PageFourComponent } from './components/page-four/page-four.component';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageThreeComponent } from './components/page-three/page-three.component';
import { PageTwoIiComponent } from './components/page-two-ii/page-two-ii.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PlanCardComponent } from './components/plan-card/plan-card.component';

@Component({
    imports: [
        SharedModule,
        PageOneComponent,
        PageTwoComponent,
        PageTwoIiComponent,
        PageThreeComponent,
        PageFourComponent,
        PlanCardComponent,
    ],
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  linkList = [
    'FAQ',
    'Help Center',
    'Terms of Use',
    'Privacy',
    'Cookie Preferences',
    'Corporate Information',
  ];
  backgroundColor = 'rgb(243, 243, 243)';

  constructor(
    private readonly titleService: Title,
    @Inject(ProdTitle) private readonly prodTitle: string,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-Register`);
  }
}
