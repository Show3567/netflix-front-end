import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthNgrxService } from './Ngrx/Auth/auth-ngrx.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onActivate(e: any) {}
}
