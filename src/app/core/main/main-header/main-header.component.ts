import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WithLocalstorageService } from 'src/app/services/auth/with-localstorage.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  isLogin!: boolean;
  username = '';

  constructor(
    private readonly withLocalstorageService: WithLocalstorageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const { jwtToken, username } = this.withLocalstorageService.userValue;
    if (jwtToken && username) {
      this.isLogin = true;
      this.username = username;
    } else {
      this.isLogin = false;
    }
  }

  signOut() {
    this.withLocalstorageService.logout();
    this.isLogin = false;
    this.username = '';
  }
}
