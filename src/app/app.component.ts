import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthNgrxService } from './Ngrx/Auth/auth-ngrx.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('mainContent')
  private mainContentElement!: ElementRef<HTMLElement>;

  constructor(private readonly authService: AuthNgrxService) {}

  ngOnInit(): void {
    // this.authService.refreshToken();
  }

  onActivate(e: any) {}
}
