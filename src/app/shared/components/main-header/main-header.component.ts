import { Component, OnInit, input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  showSearchForm = input(false, {
    transform: (val: boolean) => false, // remove the searchfrom currentlly;
  });

  isLogin!: boolean;
  username = '';
  searchKeyWord = '';

  constructor(
    private readonly authService: AuthService,
    private readonly tmdbService: TmdbService,
  ) {}

  ngOnInit(): void {
    const { jwtToken, username } = this.authService.userSignal();
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
