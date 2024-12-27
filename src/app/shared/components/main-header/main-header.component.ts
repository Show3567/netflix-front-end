import { Component, OnInit, inject, input, model, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: false,
})
export class MainHeaderComponent implements OnInit {
  // showSearchForm = input(false, {
  //   transform: (val: boolean) => false, // remove the searchfrom currentlly;
  // });
  showSearchForm = model(false);

  isLogin = signal(true);
  username = '';
  searchKeyWord = signal('');

  private readonly authService = inject(AuthService);
  private readonly tmdbService = inject(TmdbService);

  ngOnInit(): void {
    const { jwtToken, username } = this.authService.userSignal();
    if (jwtToken && username) {
      console.log('islogin: ', this.isLogin());
      this.isLogin.set(true);
      this.username = username;
    } else {
      console.log(': ', this.isLogin());
      this.isLogin.set(false);
    }
    this.showSearchForm.set(false);
  }

  searchMovieByKeyWord() {
    this.tmdbService.searchMovie(this.searchKeyWord()).subscribe(console.log);
    this.searchKeyWord.set('');
  }
  signOut() {
    this.authService.logout();
    this.isLogin.set(false);
    this.username = '';
  }
}
