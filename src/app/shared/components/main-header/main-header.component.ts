import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  input,
  model,
  signal,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit, AfterViewInit {
  // showSearchForm = input(false, {
  //   transform: (val: boolean) => false, // remove the searchfrom currentlly;
  // });
  showSearchForm = model(false);

  isLogin = signal(false);
  username = '';
  searchKeyWord = signal('');

  constructor(
    private readonly authService: AuthService,
    private readonly tmdbService: TmdbService,
    // private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const { jwtToken, username } = this.authService.userSignal();
    console.log('jwtToken: ', jwtToken, 'username: ', username);
    if (jwtToken && username) {
      this.isLogin.set(true);
      this.username = username;
    } else {
      this.isLogin.set(false);
    }
    console.log(this.isLogin);
    // this.cdr.detectChanges();
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
