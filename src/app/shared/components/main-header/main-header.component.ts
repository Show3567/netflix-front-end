import { Component, Input, OnInit } from '@angular/core';
import { TmdbNgrxService } from 'src/app/Ngrx/Tmdb/tmdb-ngrx.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() showSearchForm: boolean = false;

  isLogin!: boolean;
  username = '';
  searchKeyWord = '';

  constructor(
    private readonly authService: AuthService,
    private readonly tmdbService: TmdbNgrxService
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

  searchMovieByKeyWord() {
    this.tmdbService.searchMovie(this.searchKeyWord);
    this.searchKeyWord = '';
  }

  signOut() {
    this.authService.logout();
    this.isLogin = false;
    this.username = '';
  }
}
