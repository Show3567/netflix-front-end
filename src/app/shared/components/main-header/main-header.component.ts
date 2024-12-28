import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  model,
  signal,
} from '@angular/core';
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
  loading = signal(true);

  private readonly authService = inject(AuthService);
  private readonly tmdbService = inject(TmdbService);

  constructor() {
    this.loading.set(true);
  }

  ngOnInit(): void {
    const { jwtToken, username } = this.authService.userSignal();
    this.isLogin.set(!!jwtToken && !!username);
    this.username = username ?? '';
    console.log('check loading: ', this.loading(), this.isLogin());

    this.loading.set(false);
    console.log('check loading: ', this.loading());
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
