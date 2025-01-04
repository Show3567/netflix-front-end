import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
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
export class MainHeaderComponent implements OnInit, AfterViewInit {
  // showSearchForm = input(false, {
  //   transform: (val: boolean) => false, // remove the searchfrom currentlly;
  // });
  showSearchForm = model(false);
  username = '';

  isLogin = computed(() => {
    const { jwtToken, username } = this.authService.userSignal();
    this.username = username ?? '';
    return !!jwtToken && !!username;
  });
  searchKeyWord = signal('');

  private readonly authService = inject(AuthService);
  private readonly tmdbService = inject(TmdbService);

  ngOnInit(): void {
    this.showSearchForm.set(false);
  }
  ngAfterViewInit(): void {}

  searchMovieByKeyWord() {
    this.tmdbService.searchMovie(this.searchKeyWord()).subscribe(console.log);
    this.searchKeyWord.set('');
  }
  signOut() {
    this.authService.logout();
    this.username = '';
  }
}
