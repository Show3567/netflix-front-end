import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProdTitle } from 'src/app/app.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
    @Inject(ProdTitle) private readonly prodTitle: string
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-Register`);
  }
}
