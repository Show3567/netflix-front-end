import { HttpHandler } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { CD } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(@Inject(CD) private cd: string) {}

  ngOnInit(): void {}

  onActivate(e: any) {}
}
