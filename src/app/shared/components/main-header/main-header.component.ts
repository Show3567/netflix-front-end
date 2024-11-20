import { Component, OnInit, input, model, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    standalone: false
})
export class MainHeaderComponent implements OnInit {
  // showSearchForm = input(false, {
  //   transform: (val: boolean) => false, // remove the searchfrom currentlly;
  // });
  showSearchForm = model(false);

  isLogin!: boolean;
  username = '';
  searchKeyWord = signal('');

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
    this.showSearchForm.set(false);
  }

  searchMovieByKeyWord() {
    this.tmdbService.searchMovie(this.searchKeyWord()).subscribe(console.log);
    this.searchKeyWord.set('');
  }
  signOut() {
    this.authService.logout();
    this.isLogin = false;
    this.username = '';
  }
}
