import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  isLogin!: boolean;
  username = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    const { jwtToken, username } = this.authService.userValue;
    if (jwtToken && username) {
      this.isLogin = true;
      this.username = username;
    } else {
      this.isLogin = false;
    }
  }

  signOut() {
    this.authService.logout();
    this.isLogin = false;
    this.username = '';
  }
}
