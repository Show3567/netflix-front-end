import { Component, Input, OnInit } from '@angular/core';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

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
    private readonly authService: AuthNgrxService,
    private readonly tmdbService: TmdbService
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
    this.tmdbService.searchMovie(this.searchKeyWord).subscribe(console.log);
    this.searchKeyWord = '';
  }

  signOut() {
    this.authService.logout();
    this.isLogin = false;
    this.username = '';
  }
}
